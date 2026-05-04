
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Users, TrendingDown, Thermometer } from "lucide-react";

interface OverviewCardsProps {
  energy: number;
  occupancy: number;
  temperature: number;
  activeDevices: number;
}

export function OverviewCards({ energy, occupancy, temperature, activeDevices }: OverviewCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Energy</CardTitle>
          <Zap className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{energy.toFixed(2)} kWh</div>
          <p className="text-xs text-muted-foreground">+2.1% from last hour</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Occupancy</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{occupancy}</div>
          <p className="text-xs text-muted-foreground">Students present</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Temperature</CardTitle>
          <Thermometer className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{temperature.toFixed(1)}°C</div>
          <p className="text-xs text-muted-foreground">Optimal range (22-26°C)</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Devices</CardTitle>
          <TrendingDown className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeDevices}</div>
          <p className="text-xs text-muted-foreground">Devices currently running</p>
        </CardContent>
      </Card>
    </div>
  );
}
