
"use client"

import { useEffect, useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { EnergyChart } from "@/components/dashboard/EnergyChart";
import { SensorData, generateHistoryData, generateSensorData } from "@/lib/mock-data";

export default function AnalyticsPage() {
  const [historyData, setHistoryData] = useState<SensorData[]>([]);

  useEffect(() => {
    // Initial data - simulate a longer history for analytics
    setHistoryData(generateHistoryData(48));

    const interval = setInterval(() => {
      setHistoryData(prev => {
        const newData = generateSensorData();
        const newHistory = [...prev, newData];
        if (newHistory.length > 48) newHistory.shift(); 
        return newHistory;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AppLayout>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-1">
        <EnergyChart data={historyData} />
      </div>
    </AppLayout>
  );
}
