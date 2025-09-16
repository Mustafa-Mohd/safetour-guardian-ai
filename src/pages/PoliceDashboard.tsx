import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useEmergencyAlerts } from "@/hooks/useEmergencyAlerts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import MapComponent from "@/components/MapComponent";
import { Header } from "@/components/Header";
import { supabase } from "@/integrations/supabase/client";
import { 
  Shield, 
  Users, 
  AlertTriangle, 
  Clock, 
  MapPin, 
  Phone,
  MessageSquare,
  RefreshCw
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface TouristLocation {
  id: string;
  latitude: number;
  longitude: number;
  user_id: string;
  timestamp: string;
}

export const PoliceDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { alerts, acknowledgeAlert, resolveAlert, activeAlertsCount } = useEmergencyAlerts();
  const [touristLocations, setTouristLocations] = useState<TouristLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
  }, [user, navigate]);

  const fetchTouristLocations = async () => {
    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Error fetching locations:', error);
      return;
    }

    setTouristLocations(data || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTouristLocations();

    const channel = supabase
      .channel('location-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'locations'
        },
        () => {
          fetchTouristLocations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleAcknowledgeAlert = async (alertId: string) => {
    const success = await acknowledgeAlert(alertId);
    if (success) {
      toast({
        title: "Alert Acknowledged",
        description: "Alert has been acknowledged and is being handled.",
      });
    }
  };

  const handleResolveAlert = async (alertId: string) => {
    const success = await resolveAlert(alertId);
    if (success) {
      toast({
        title: "Alert Resolved",
        description: "Alert has been marked as resolved.",
      });
    }
  };

  if (!user) return null;

  const activeAlerts = alerts.filter(alert => alert.status === 'active');
  const acknowledgedAlerts = alerts.filter(alert => alert.status === 'acknowledged');

  return (
    <div className="min-h-screen bg-background">
      <Header showEmergencyButton={false} />
      
      <div className="container mx-auto px-4 py-6">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-0 bg-card/80 backdrop-blur-sm">
            <CardContent className="flex items-center p-4">
              <div className="p-2 bg-blue-500/10 rounded-lg mr-3">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Tourists</p>
                <p className="text-xl font-bold">{touristLocations.length}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/80 backdrop-blur-sm">
            <CardContent className="flex items-center p-4">
              <div className="p-2 bg-red-500/10 rounded-lg mr-3">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Alerts</p>
                <p className="text-xl font-bold text-red-600">{activeAlertsCount}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/80 backdrop-blur-sm">
            <CardContent className="flex items-center p-4">
              <div className="p-2 bg-amber-500/10 rounded-lg mr-3">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Response Time</p>
                <p className="text-xl font-bold">2.4 min</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/80 backdrop-blur-sm">
            <CardContent className="flex items-center p-4">
              <div className="p-2 bg-emerald-500/10 rounded-lg mr-3">
                <Shield className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Safety Score</p>
                <p className="text-xl font-bold text-emerald-600">92%</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map View */}
          <Card className="lg:col-span-2 border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Live Tourist Tracking
              </CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={fetchTouristLocations}
                disabled={isLoading}
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] rounded-lg overflow-hidden">
                <MapComponent 
                  touristLocations={touristLocations}
                  emergencyAlerts={alerts}
                  showControls={true}
                />
              </div>
              <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Tourists ({touristLocations.length})</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Emergency Alerts ({activeAlerts.length})</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alerts Panel */}
          <Card className="border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Emergency Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeAlerts.length === 0 && acknowledgedAlerts.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Shield className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No active alerts</p>
                  <p className="text-xs">All tourists are safe</p>
                </div>
              ) : (
                <>
                  {activeAlerts.map((alert) => (
                    <div key={alert.id} className="p-3 border border-red-200 bg-red-50/50 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <Badge className="bg-red-500/10 text-red-700 border-red-200 mb-1">
                            {alert.alert_type}
                          </Badge>
                          <p className="text-sm font-medium">Emergency Alert</p>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(alert.created_at).toLocaleTimeString()}
                        </div>
                      </div>
                      
                      {alert.message && (
                        <p className="text-sm text-muted-foreground mb-3">{alert.message}</p>
                      )}
                      
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAcknowledgeAlert(alert.id)}
                          className="flex items-center gap-1"
                        >
                          <Phone className="w-3 h-3" />
                          Respond
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleResolveAlert(alert.id)}
                          className="flex items-center gap-1"
                        >
                          <Shield className="w-3 h-3" />
                          Resolve
                        </Button>
                      </div>
                    </div>
                  ))}

                  {acknowledgedAlerts.map((alert) => (
                    <div key={alert.id} className="p-3 border border-amber-200 bg-amber-50/50 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <Badge className="bg-amber-500/10 text-amber-700 border-amber-200 mb-1">
                            In Progress
                          </Badge>
                          <p className="text-sm font-medium">{alert.alert_type}</p>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(alert.acknowledged_at || alert.created_at).toLocaleTimeString()}
                        </div>
                      </div>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleResolveAlert(alert.id)}
                        className="flex items-center gap-1"
                      >
                        <Shield className="w-3 h-3" />
                        Mark Resolved
                      </Button>
                    </div>
                  ))}
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-6 border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4">
                <MessageSquare className="w-5 h-5" />
                <span className="text-sm">Send Alert</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4">
                <Users className="w-5 h-5" />
                <span className="text-sm">View Reports</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4">
                <MapPin className="w-5 h-5" />
                <span className="text-sm">Set Zones</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4">
                <Phone className="w-5 h-5" />
                <span className="text-sm">Emergency Contact</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};