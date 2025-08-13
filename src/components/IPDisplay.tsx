import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, MapPin, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface IPDisplayProps {
  isConnected: boolean;
}

export function IPDisplay({ isConnected }: IPDisplayProps) {
  const { toast } = useToast();
  
  const realIP = "203.145.67.89";
  const vpnIP = "185.246.208.123";
  const realLocation = "New York, USA";
  const vpnLocation = "Amsterdam, Netherlands";
  
  const currentIP = isConnected ? vpnIP : realIP;
  const currentLocation = isConnected ? vpnLocation : realLocation;
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "IP address copied successfully",
    });
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-card/40 backdrop-blur-sm border-neon">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold flex items-center gap-2">
            {isConnected ? (
              <EyeOff className="h-5 w-5 text-accent" />
            ) : (
              <Eye className="h-5 w-5 text-warning" />
            )}
            Your IP Address
          </h3>
          <Badge 
            variant={isConnected ? "default" : "destructive"}
            className={
              isConnected 
                ? "bg-accent/20 text-accent border-accent/30" 
                : "bg-warning/20 text-warning border-warning/30"
            }
          >
            {isConnected ? "Protected" : "Exposed"}
          </Badge>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-mono font-bold text-primary">{currentIP}</p>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <MapPin className="h-3 w-3" />
                <span>{currentLocation}</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(currentIP)}
              className="hover:bg-muted/50"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          
          {!isConnected && (
            <div className="mt-3 p-3 bg-warning/10 border border-warning/30 rounded-lg">
              <p className="text-sm text-warning">
                ⚠️ Your real IP address is visible. Connect to VPN to protect your privacy.
              </p>
            </div>
          )}
          
          {isConnected && (
            <div className="mt-3 p-3 bg-accent/10 border border-accent/30 rounded-lg">
              <p className="text-sm text-accent">
                ✅ Your real IP is hidden. You're browsing securely through our VPN.
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}