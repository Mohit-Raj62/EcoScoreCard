
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SensorData } from "@/lib/mock-data";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface EnergyChartProps {
  data: SensorData[];
}

export function EnergyChart({ data }: EnergyChartProps) {
  // Format data for chart
  const chartData = data.map(d => ({
    time: new Date(d.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    energy: d.energy,
    occupancy: d.occupancy,
  })).reverse();

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Energy Consumption History</CardTitle>
        <CardDescription>Real-time energy usage (kWh) vs Occupancy</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
                <XAxis
                dataKey="time"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                />
                <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Line
                type="monotone"
                dataKey="energy"
                stroke="#8884d8"
                strokeWidth={2}
                activeDot={{ r: 8 }}
                name="Energy (kWh)"
                />
                <Line
                type="monotone"
                dataKey="occupancy"
                stroke="#82ca9d"
                strokeWidth={2}
                name="Occupancy"
                />
            </LineChart>
            </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
