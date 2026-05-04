
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Device } from "@/lib/mock-data";
import { Lightbulb, Fan, Projector } from "lucide-react";

interface DeviceControlParamsProps {
  devices: Device[];
  onToggle: (id: string) => void;
}

export function DeviceControlParams({ devices, onToggle }: DeviceControlParamsProps) {
  const getIcon = (type: Device['type']) => {
    switch (type) {
      case 'light': return <Lightbulb className="h-4 w-4" />;
      case 'ac': return <Fan className="h-4 w-4" />;
      case 'projector': return <Projector className="h-4 w-4" />;
    }
  };

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Device Control</CardTitle>
        <CardDescription>Manage classroom devices manually or set to auto.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {devices.map((device) => (
            <div key={device.id} className="flex items-center justify-between space-x-4 rounded-md border p-4">
              <div className="flex items-center space-x-4">
                {getIcon(device.type)}
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{device.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {device.isOn ? 'On' : 'Off'} • {device.powerConsumption}W
                  </p>
                </div>
              </div>
              <Switch
                checked={device.isOn}
                onCheckedChange={() => onToggle(device.id)}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
