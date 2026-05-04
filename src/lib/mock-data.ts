export interface SensorData {
  timestamp: string;
  energy: number; // in kWh
  occupancy: number; // count
  temperature: number; // in Celsius
}

export interface Device {
  id: string;
  name: string;
  type: "light" | "ac" | "projector";
  isOn: boolean;
  powerConsumption: number; // in Watts
}

export interface DecisionLog {
  id: string;
  timestamp: string;
  message: string;
  type: "info" | "success" | "warning";
}

export const initialDevices: Device[] = [
  {
    id: "1",
    name: "Main Lights",
    type: "light",
    isOn: true,
    powerConsumption: 150,
  },
  {
    id: "2",
    name: "AC Unit 1",
    type: "ac",
    isOn: true,
    powerConsumption: 1200,
  },
  {
    id: "3",
    name: "Projector",
    type: "projector",
    isOn: false,
    powerConsumption: 300,
  },
  {
    id: "4",
    name: "AC Unit 2",
    type: "ac",
    isOn: false,
    powerConsumption: 1200,
  },
];

export const generateSensorData = (): SensorData => {
  const now = new Date();
  return {
    timestamp: now.toISOString(),
    energy: Math.random() * 5 + 10, // Random value between 10 and 15 kWh
    occupancy: Math.floor(Math.random() * 30), // Random occupancy between 0 and 30
    temperature: Math.random() * 5 + 20, // Random temperature between 20 and 25
  };
};

export const generateHistoryData = (hours: number): SensorData[] => {
  const data: SensorData[] = [];
  const now = new Date();
  for (let i = hours; i > 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    data.push({
      timestamp: time.toISOString(),
      energy: Math.random() * 5 + 10,
      occupancy: Math.floor(Math.random() * 30),
      temperature: Math.random() * 5 + 20,
    });
  }
  return data;
};

// New function to simulate AI decisions based on data
export const checkAI_Rules = (
  data: SensorData,
  currentDevices: Device[],
): { logs: DecisionLog[]; updates: Partial<Device>[] } => {
  const logs: DecisionLog[] = [];
  const updates: Partial<Device>[] = [];
  const time = new Date().toLocaleTimeString();

  // Rule 1: Occupancy = 0 -> Turn off everything
  if (data.occupancy === 0) {
    const activeDevs = currentDevices.filter((d) => d.isOn);
    if (activeDevs.length > 0) {
      logs.push({
        id: Math.random().toString(),
        timestamp: time,
        message: `Occupancy is 0. Auto-shutdown initiated for ${activeDevs.length} devices.`,
        type: "warning",
      });
      activeDevs.forEach((d) => updates.push({ id: d.id, isOn: false }));
    }
  }

  // Rule 2: Temp < 24 -> Turn off AC 2 if running
  if (data.temperature < 24) {
    const ac2 = currentDevices.find((d) => d.id === "4" && d.isOn);
    if (ac2) {
      logs.push({
        id: Math.random().toString(),
        timestamp: time,
        message: `Temp (${data.temperature.toFixed(1)}°C) is ideal. Turning off AC Unit 2 to save power.`,
        type: "success",
      });
      updates.push({ id: "4", isOn: false });
    }
  }

  // Rule 3: High Occupancy -> Ensure Main Lights are ON
  if (data.occupancy > 10) {
    const lights = currentDevices.find((d) => d.id === "1" && !d.isOn);
    if (lights) {
      logs.push({
        id: Math.random().toString(),
        timestamp: time,
        message: `Occupancy increased (${data.occupancy}). Activating Main Lights for visibility.`,
        type: "info",
      });
      updates.push({ id: "1", isOn: true });
    }
  }

  // Rule 4: High Occupancy -> Ensure AC Unit 1 is ON for comfort
  if (data.occupancy > 5) {
    const ac1 = currentDevices.find((d) => d.id === "2" && !d.isOn);
    if (ac1) {
      logs.push({
        id: Math.random().toString(),
        timestamp: time,
        message: `Classroom occupancy is ${data.occupancy}. Turning ON AC Unit 1 for cooling.`,
        type: "success",
      });
      updates.push({ id: "2", isOn: true });
    }
  }

  // Rule 5: High Occupancy (Lecture Mode) -> Turn ON Projector
  if (data.occupancy > 5) {
    const projector = currentDevices.find((d) => d.id === "3" && !d.isOn);
    if (projector) {
      logs.push({
        id: Math.random().toString(),
        timestamp: time,
        message: `Classroom occupancy > 5 (${data.occupancy}). Auto-starting Projector for lecture.`,
        type: "info",
      });
      updates.push({ id: "3", isOn: true });
    }
  }

  // Rule 6: Low Occupancy -> Turn OFF Projector (End of Class)
  if (data.occupancy < 2 && data.occupancy > 0) {
    const projector = currentDevices.find((d) => d.id === "3" && d.isOn);
    if (projector) {
      logs.push({
        id: Math.random().toString(),
        timestamp: time,
        message: `Class ended (Occupancy < 2). Turning OFF Projector.`,
        type: "success",
      });
      updates.push({ id: "3", isOn: false });
    }
  }

  return { logs, updates };
};
