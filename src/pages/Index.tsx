import { useState } from "react";
import { Header } from "@/components/Header";
import { UserTypeSelector } from "@/components/UserTypeSelector";
import { DashboardStats } from "@/components/DashboardStats";
import { SafetyStatus } from "@/components/SafetyStatus";
import { EmergencyButton } from "@/components/EmergencyButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Shield, Users, AlertTriangle } from "lucide-react";
import heroImage from "@/assets/hero-safesafar.jpg";

const Index = () => {
  const [selectedUserType, setSelectedUserType] = useState<"tourist" | "authority" | null>(null);

  const handleUserTypeSelect = (type: "tourist" | "authority") => {
    setSelectedUserType(type);
  };

  const handleBackToSelection = () => {
    setSelectedUserType(null);
  };

  if (!selectedUserType) {
    return (
      <div className="min-h-screen bg-background">
        <Header showEmergencyButton={false} />
        
        {/* Hero Section */}
        <section className="relative bg-gradient-hero text-primary-foreground overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
            style={{ backgroundImage: `url(${heroImage})` }}
          ></div>
          
          <div className="relative container mx-auto px-4 py-24 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Safe Tourism,
                <br />
                <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  Smart Response
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-2xl mx-auto">
                Real-time safety monitoring and emergency response system for tourists and authorities in India.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm text-lg px-8 py-4"
                >
                  <Shield className="w-5 h-5 mr-2" />
                  Get Started
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="bg-transparent hover:bg-white/10 text-white border-white/50 text-lg px-8 py-4"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Access Type</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                SafeSafar provides tailored interfaces for both tourists seeking safety assistance and authorities managing emergency responses.
              </p>
            </div>
            
            <UserTypeSelector onSelect={handleUserTypeSelect} />
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h3 className="text-2xl font-bold text-center mb-12">Real-time Safety Overview</h3>
            <DashboardStats />
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Dashboard Header */}
      <div className="bg-gradient-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {selectedUserType === "tourist" ? "Tourist Dashboard" : "Authority Control Center"}
              </h1>
              <p className="text-blue-100">
                {selectedUserType === "tourist" 
                  ? "Stay safe and connected during your travels" 
                  : "Monitor tourist safety and manage emergency responses"
                }
              </p>
            </div>
            <Button 
              onClick={handleBackToSelection}
              variant="outline"
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              Switch Access Type
            </Button>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <DashboardStats />
            
            {/* Map Placeholder */}
            <Card className="shadow-soft border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-primary" />
                  Interactive Safety Map
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-safety/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                    <p className="text-lg font-medium">Interactive Map</p>
                    <p className="text-muted-foreground">Real-time location tracking and safety zones</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Emergency Section */}
            {selectedUserType === "tourist" && (
              <Card className="shadow-emergency border-emergency/20 bg-emergency/5">
                <CardHeader>
                  <CardTitle className="text-emergency">Emergency Assistance</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <EmergencyButton />
                </CardContent>
              </Card>
            )}

            {/* Safety Status */}
            <SafetyStatus 
              safetyLevel="safe"
              touristCount={247}
              activeAlerts={3}
            />

            {/* Quick Actions */}
            <Card className="shadow-soft border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-primary" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <MapPin className="w-4 h-4 mr-2" />
                  View Safety Zones
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Report Incident
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
