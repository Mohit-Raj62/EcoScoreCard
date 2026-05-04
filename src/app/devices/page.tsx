
"use client"

import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { DeviceControlParams } from "@/components/dashboard/DeviceControlParams";
import { Device, initialDevices } from "@/lib/mock-data";

export default function DevicesPage() {
  const [devices, setDevices] = useState<Device[]>(initialDevices);

  const handleDeviceToggle = (id: string) => {
    setDevices(prev => prev.map(device => 
      device.id === id ? { ...device, isOn: !device.isOn } : device
    ));
  };

  return (
    <AppLayout>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Device Control</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <DeviceControlParams devices={devices} onToggle={handleDeviceToggle} />
      </div>
    </AppLayout>
  );
}
