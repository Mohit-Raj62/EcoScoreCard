
"use client"

import { useEffect, useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { OverviewCards } from "@/components/dashboard/OverviewCards";
import { EnergyChart } from "@/components/dashboard/EnergyChart";
import { DeviceControlParams } from "@/components/dashboard/DeviceControlParams";
import { AIDecisionLog } from "@/components/dashboard/AIDecisionLog";
import { EcoScoreCard } from "@/components/dashboard/EcoScoreCard";
import { AIToggle } from "@/components/dashboard/AIToggle";
import { ClassroomMap } from "@/components/dashboard/ClassroomMap";
import { SensorData, Device, DecisionLog, initialDevices, generateSensorData, generateHistoryData, checkAI_Rules } from "@/lib/mock-data";

export default function DashboardPage() {
  const [sensorData, setSensorData] = useState<SensorData>({
    timestamp: new Date().toISOString(),
    energy: 12.5,
    occupancy: 8,
    temperature: 24,
  });
  const [historyData, setHistoryData] = useState<SensorData[]>([]);
  const [devices, setDevices] = useState<Device[]>(initialDevices);
  const [logs, setLogs] = useState<DecisionLog[]>([]);
  const [aiMode, setAiMode] = useState(false);
  const [ecoScore, setEcoScore] = useState(75);
  const [savings, setSavings] = useState(124.50);

  // Simulate real-time data updates
  useEffect(() => {
    // Initial data
    setSensorData(generateSensorData());
    setHistoryData(generateHistoryData(24));

    const interval = setInterval(() => {
      const newData = generateSensorData();
      setSensorData(newData);
      setHistoryData(prev => {
        const newHistory = [...prev, newData];
        if (newHistory.length > 24) newHistory.shift();
        return newHistory;
      });

      // Update Eco Score dynamically
      setEcoScore(prev => Math.min(100, Math.max(50, prev + (Math.random() > 0.5 ? 1 : -1))));
      setSavings(prev => prev + 0.05);

      // AI Logic
      if (aiMode) {
        const { logs: newLogs, updates } = checkAI_Rules(newData, devices);
        if (newLogs.length > 0) {
          setLogs(prev => [...newLogs, ...prev].slice(0, 50)); // Keep last 50 logs
        }
        if (updates.length > 0) {
            setDevices(prev => prev.map(d => {
                const update = updates.find(u => u.id === d.id);
                return update ? { ...d, ...update } : d;
            }));
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [aiMode, devices]); // Re-run when aiMode or devices change to access latest state

  const handleDeviceToggle = (id: string) => {
    if (aiMode) {
      // Optional: Prevent manual override in AI mode or log a warning
      setLogs(prev => [{
        id: Math.random().toString(),
        timestamp: new Date().toLocaleTimeString(),
        message: "Manual override detected. AI adjusting...",
        type: 'warning'
      }, ...prev]);
    }
    setDevices(prev => prev.map(device => 
      device.id === id ? { ...device, isOn: !device.isOn } : device
    ));
  };

  const activeDevicesCount = devices.filter(d => d.isOn).length;

  return (
    <AppLayout>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <AIToggle enabled={aiMode} onToggle={setAiMode} />
        </div>
      </div>
      <OverviewCards 
        energy={sensorData.energy} 
        occupancy={sensorData.occupancy} 
        temperature={sensorData.temperature}
        activeDevices={activeDevicesCount}
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 space-y-4">
             <EnergyChart data={historyData} />
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <EcoScoreCard score={ecoScore} savings={savings} />
                <DeviceControlParams devices={devices} onToggle={handleDeviceToggle} />
             </div>
        </div>
        <div className="col-span-3 space-y-4">
            <ClassroomMap devices={devices} occupancy={sensorData.occupancy} />
            <AIDecisionLog logs={logs} />
        </div>
      </div>
    </AppLayout>
  );
}
