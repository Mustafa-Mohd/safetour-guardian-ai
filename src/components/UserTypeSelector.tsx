import { User, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface UserTypeSelectorProps {
  onSelect: (type: "tourist" | "authority") => void;
}

export const UserTypeSelector = ({ onSelect }: UserTypeSelectorProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      <Card className="cursor-pointer transition-all hover:shadow-soft border-2 hover:border-primary/20 bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-4">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-xl">Tourist Access</CardTitle>
          <CardDescription>
            Safe travel monitoring and emergency assistance
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Button 
            onClick={() => onSelect("tourist")}
            className="w-full bg-gradient-primary hover:bg-primary/90 text-primary-foreground shadow-soft border-0"
            size="lg"
          >
            Access Tourist Dashboard
          </Button>
          
          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-safety rounded-full mr-3"></div>
              Real-time location monitoring
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-safety rounded-full mr-3"></div>
              Emergency alert system
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-safety rounded-full mr-3"></div>
              Safety zone notifications
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="cursor-pointer transition-all hover:shadow-soft border-2 hover:border-primary/20 bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-4">
          <div className="w-16 h-16 bg-gradient-emergency rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-emergency-foreground" />
          </div>
          <CardTitle className="text-xl">Authority Access</CardTitle>
          <CardDescription>
            Monitor tourists and manage emergency responses
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Button 
            onClick={() => onSelect("authority")}
            className="w-full bg-gradient-emergency hover:bg-emergency/90 text-emergency-foreground shadow-emergency border-0"
            size="lg"
          >
            Access Authority Dashboard
          </Button>
          
          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-emergency rounded-full mr-3"></div>
              Real-time tourist monitoring
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-emergency rounded-full mr-3"></div>
              Incident management system
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-emergency rounded-full mr-3"></div>
              Emergency response coordination
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};