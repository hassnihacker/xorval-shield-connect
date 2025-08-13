import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, ShieldOff, Wifi, Globe, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConnectionStatusProps {
  isConnected: boolean;
  serverLocation?: string;
  connectionTime?: string;
  protocol?: string;
}

export function ConnectionStatus({ 
  isConnected, 
  serverLocation = "Auto-Selected", 
  connectionTime = "00:00:00",
  protocol = "WireGuard"
}: ConnectionStatusProps) {
  return (
    <Card className="p-4 bg-card/30 backdrop-blur-sm border-neon">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {isConnected ? (
            <Shield className="h-5 w-5 text-connected" />
          ) : (
            <ShieldOff className="h-5 w-5 text-destructive" />
          )}
          <h3 className="font-semibold">Connection Status</h3>
        </div>
        
        <Badge 
          variant={isConnected ? "default" : "destructive"}
          className={cn(
            "transition-smooth",
            isConnected 
              ? "bg-connected/20 text-connected border-connected/30 pulse-connected" 
              : "bg-destructive/20 text-destructive border-destructive/30"
          )}
        >
          {isConnected ? "Connected" : "Disconnected"}
        </Badge>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Globe className="h-4 w-4" />
            <span>Server</span>
          </div>
          <span className="text-foreground font-medium">{serverLocation}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Wifi className="h-4 w-4" />
            <span>Protocol</span>
          </div>
          <span className="text-foreground font-medium">{protocol}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Duration</span>
          </div>
          <span className="text-foreground font-medium">{connectionTime}</span>
        </div>
      </div>
    </Card>
  );
}