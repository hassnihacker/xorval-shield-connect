import { useState, useEffect } from "react";
import { VPNButton } from "@/components/VPNButton";
import { ServerList } from "@/components/ServerList";
import { ConnectionStatus } from "@/components/ConnectionStatus";
import { IPDisplay } from "@/components/IPDisplay";
import xorvalLogo from "@/assets/xorval-logo.png";

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [selectedServer, setSelectedServer] = useState("auto");
  const [connectionTime, setConnectionTime] = useState("00:00:00");

  // Timer for connection duration
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isConnected) {
      const startTime = Date.now();
      interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const hours = Math.floor(elapsed / 3600);
        const minutes = Math.floor((elapsed % 3600) / 60);
        const seconds = elapsed % 60;
        
        setConnectionTime(
          `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        );
      }, 1000);
    } else {
      setConnectionTime("00:00:00");
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isConnected]);

  const handleVPNToggle = () => {
    setIsConnected(!isConnected);
  };

  const handleServerChange = (serverId: string) => {
    setSelectedServer(serverId);
    // If connected, reconnect with new server
    if (isConnected) {
      setIsConnected(false);
      setTimeout(() => setIsConnected(true), 1000);
    }
  };

  const getServerName = (serverId: string) => {
    const serverMap: Record<string, string> = {
      auto: "Auto-Selected (USA)",
      us: "United States",
      uk: "United Kingdom",
      de: "Germany",
      sg: "Singapore",
      ca: "Canada",
      au: "Australia",
      in: "India",
      jp: "Japan",
    };
    return serverMap[serverId] || "Auto-Selected";
  };

  return (
    <div className="min-h-screen bg-gradient-bg p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Logo */}
        <div className="text-center pt-8 pb-4">
          <img 
            src={xorvalLogo} 
            alt="Xorval VPN" 
            className="h-16 w-auto mx-auto mb-4 animate-fade-in"
          />
          <h1 className="text-2xl font-bold text-foreground mb-2">Xorval VPN</h1>
          <p className="text-sm text-muted-foreground">Secure • Fast • Private</p>
        </div>

        {/* Main VPN Button */}
        <div className="animate-slide-up">
          <VPNButton isConnected={isConnected} onToggle={handleVPNToggle} />
        </div>

        {/* Connection Status */}
        <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <ConnectionStatus 
            isConnected={isConnected}
            serverLocation={getServerName(selectedServer)}
            connectionTime={connectionTime}
            protocol="WireGuard"
          />
        </div>

        {/* IP Display */}
        <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <IPDisplay isConnected={isConnected} />
        </div>

        {/* Server List */}
        <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <ServerList 
            selectedServer={selectedServer}
            onServerChange={handleServerChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
