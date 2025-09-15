import { MapPin, Navigation, AlertCircle, Phone, Settings } from "lucide-react";
import { Header } from "@/components/Header";
import { SafetyStatus } from "@/components/SafetyStatus";
import { EmergencyButton } from "@/components/EmergencyButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const TouristDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome to SafeSafar
          </h1>
          <p className="text-muted-foreground">
            Your safety companion for secure travel
          </p>
        </div>

        {/* Safety Status */}
        <SafetyStatus 
          safetyLevel="safe"
          touristCount={47}
          activeAlerts={2}
        />

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="shadow-soft border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-primary" />
                Navigation
              </CardTitle>
              <CardDescription>
                Find safe routes and nearby attractions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gradient-primary hover:bg-primary/90">
                <Navigation className="w-4 h-4 mr-2" />
                Open Map
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-soft border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-warning" />
                Safety Alerts
              </CardTitle>
              <CardDescription>
                View current safety notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Active Alerts</span>
                  <Badge className="bg-warning/10 text-warning border-warning/20">
                    2 New
                  </Badge>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                View All Alerts
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-soft border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Phone className="w-5 h-5 mr-2 text-primary" />
                Emergency Contacts
              </CardTitle>
              <CardDescription>
                Quick access to help services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-muted-foreground mb-4">
                <div>Police: 100</div>
                <div>Tourist Helpline: 1363</div>
                <div>Medical Emergency: 108</div>
              </div>
              <Button variant="outline" className="w-full">
                <Settings className="w-4 h-4 mr-2" />
                Manage Contacts
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Button */}
        <div className="flex justify-center">
          <EmergencyButton />
        </div>

        {/* Recent Activity */}
        <Card className="shadow-soft border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your travel and safety activity log
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-safety rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Location check-in</p>
                  <p className="text-xs text-muted-foreground">Shillong, Meghalaya - 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Safety zone entered</p>
                  <p className="text-xs text-muted-foreground">Police Point - 4 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-warning rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Weather alert received</p>
                  <p className="text-xs text-muted-foreground">Heavy rain warning - 6 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};