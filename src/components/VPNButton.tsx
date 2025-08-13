import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Power, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface VPNButtonProps {
  isConnected: boolean;
  onToggle: () => void;
}

export function VPNButton({ isConnected, onToggle }: VPNButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    // Simulate connection delay
    setTimeout(() => {
      onToggle();
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Button
        onClick={handleClick}
        disabled={isLoading}
        size="lg"
        className={cn(
          "relative h-32 w-32 rounded-full border-2 transition-all duration-500",
          "hover:scale-105 active:scale-95",
          isConnected
            ? "bg-gradient-accent border-connected text-connected-foreground animate-connect-pulse"
            : "bg-gradient-primary border-primary text-primary-foreground animate-glow-pulse",
          isLoading && "animate-pulse"
        )}
      >
        <div className="flex flex-col items-center space-y-2">
          {isLoading ? (
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : isConnected ? (
            <Shield className="h-8 w-8" />
          ) : (
            <Power className="h-8 w-8" />
          )}
          <span className="text-sm font-semibold">
            {isLoading ? "..." : isConnected ? "Connected" : "Connect"}
          </span>
        </div>
      </Button>
      
      <div className="text-center">
        <p className="text-lg font-medium">
          {isConnected ? "Secure Connection Active" : "Tap to Connect"}
        </p>
        <p className="text-sm text-muted-foreground">
          {isConnected ? "Your connection is encrypted" : "Connect to secure your browsing"}
        </p>
      </div>
    </div>
  );
}