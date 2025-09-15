import { Users, MapPin, AlertTriangle, FileText, Activity, Filter } from "lucide-react";
import { Header } from "@/components/Header";
import { DashboardStats } from "@/components/DashboardStats";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const AuthorityDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header showEmergencyButton={false} />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Authority Control Center
          </h1>
          <p className="text-muted-foreground">
            Real-time tourist monitoring and incident management
          </p>
        </div>

        {/* Dashboard Stats */}
        <DashboardStats />

        {/* Main Dashboard Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Real-Time Map */}
          <Card className="lg:col-span-2 shadow-soft border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-primary" />
                Real-Time Tourist Map
              </CardTitle>
              <CardDescription>
                Live tracking of tourist locations and safety zones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-primary/5 rounded-lg h-80 flex items-center justify-center border-2 border-dashed border-primary/20">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                  <p className="text-muted-foreground">Interactive map will be displayed here</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Showing tourist clusters, safety zones, and active alerts
                  </p>
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter View
                </Button>
                <Button size="sm" className="bg-gradient-primary hover:bg-primary/90">
                  <Activity className="w-4 h-4 mr-2" />
                  Live Mode
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Active Alerts */}
          <Card className="shadow-soft border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-warning" />
                Active Alerts
              </CardTitle>
              <CardDescription>
                Current incidents requiring attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-emergency pl-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-emergency/10 text-emergency border-emergency/20">
                      High Priority
                    </Badge>
                    <span className="text-xs text-muted-foreground">5 min ago</span>
                  </div>
                  <p className="text-sm font-medium">Tourist missing in Cherrapunji</p>
                  <p className="text-xs text-muted-foreground">Last seen: Living Root Bridge</p>
                </div>

                <div className="border-l-4 border-warning pl-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-warning/10 text-warning border-warning/20">
                      Medium
                    </Badge>
                    <span className="text-xs text-muted-foreground">15 min ago</span>
                  </div>
                  <p className="text-sm font-medium">Weather alert - Heavy rain</p>
                  <p className="text-xs text-muted-foreground">Affecting 23 tourists</p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-primary/10 text-primary border-primary/20">
                      Info
                    </Badge>
                    <span className="text-xs text-muted-foreground">1 hour ago</span>
                  </div>
                  <p className="text-sm font-medium">Large group check-in</p>
                  <p className="text-xs text-muted-foreground">15 tourists at Umiam Lake</p>
                </div>
              </div>
              
              <Button variant="outline" className="w-full mt-4">
                View All Alerts
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Incidents & Reports */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-soft border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2 text-primary" />
                Recent Incidents
              </CardTitle>
              <CardDescription>
                Latest incident reports and resolutions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-safety rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Medical assistance provided</p>
                    <p className="text-xs text-muted-foreground">Tourist treated for minor injury - Ward's Lake</p>
                    <p className="text-xs text-muted-foreground">Resolved • 2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Lost tourist located</p>
                    <p className="text-xs text-muted-foreground">Found safe in Laitlum Canyons area</p>
                    <p className="text-xs text-muted-foreground">Resolved • 4 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Safety zone violation</p>
                    <p className="text-xs text-muted-foreground">Tourist entered restricted area - Elephant Falls</p>
                    <p className="text-xs text-muted-foreground">Resolved • Yesterday</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-primary" />
                Tourist Management
              </CardTitle>
              <CardDescription>
                Quick actions for tourist assistance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-start bg-gradient-emergency hover:bg-emergency/90 text-emergency-foreground">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Send Emergency Alert
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Generate E-FIR Report
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <MapPin className="w-4 h-4 mr-2" />
                Update Safety Zones
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                Bulk Message Tourists
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};