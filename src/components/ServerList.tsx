import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wifi, Zap, Globe } from "lucide-react";

interface Server {
  id: string;
  country: string;
  city: string;
  flag: string;
  ping: number;
  load: number;
  isFastest?: boolean;
}

const servers: Server[] = [
  { id: "us", country: "United States", city: "New York", flag: "🇺🇸", ping: 45, load: 23, isFastest: true },
  { id: "uk", country: "United Kingdom", city: "London", flag: "🇬🇧", ping: 78, load: 45 },
  { id: "de", country: "Germany", city: "Frankfurt", flag: "🇩🇪", ping: 67, load: 34 },
  { id: "sg", country: "Singapore", city: "Singapore", flag: "🇸🇬", ping: 123, load: 56 },
  { id: "ca", country: "Canada", city: "Toronto", flag: "🇨🇦", ping: 89, load: 67 },
  { id: "au", country: "Australia", city: "Sydney", flag: "🇦🇺", ping: 234, load: 78 },
  { id: "in", country: "India", city: "Mumbai", flag: "🇮🇳", ping: 167, load: 45 },
  { id: "jp", country: "Japan", city: "Tokyo", flag: "🇯🇵", ping: 145, load: 34 },
];

interface ServerListProps {
  selectedServer: string;
  onServerChange: (serverId: string) => void;
}

export function ServerList({ selectedServer, onServerChange }: ServerListProps) {
  return (
    <Card className="p-4 bg-card/50 backdrop-blur-sm border-neon">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" />
          Server Locations
        </h3>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onServerChange("auto")}
          className={selectedServer === "auto" ? "border-primary text-primary" : ""}
        >
          <Zap className="h-4 w-4 mr-1" />
          Auto
        </Button>
      </div>
      
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {servers.map((server) => (
          <Button
            key={server.id}
            variant="ghost"
            className={`w-full justify-between p-3 h-auto transition-smooth ${
              selectedServer === server.id 
                ? "bg-primary/10 border border-primary/30 text-primary" 
                : "hover:bg-muted/50"
            }`}
            onClick={() => onServerChange(server.id)}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{server.flag}</span>
              <div className="text-left">
                <p className="font-medium">{server.country}</p>
                <p className="text-sm text-muted-foreground">{server.city}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {server.isFastest && (
                <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30">
                  <Zap className="h-3 w-3 mr-1" />
                  Fastest
                </Badge>
              )}
              <div className="text-right text-sm">
                <div className="flex items-center gap-1">
                  <Wifi className="h-3 w-3 text-primary" />
                  <span>{server.ping}ms</span>
                </div>
                <span className="text-muted-foreground">{server.load}% load</span>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </Card>
  );
}