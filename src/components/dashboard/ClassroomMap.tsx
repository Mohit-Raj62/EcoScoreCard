
import { Device } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Lightbulb, Fan, Projector, User } from "lucide-react";

interface ClassroomMapProps {
  devices: Device[];
  occupancy: number;
}

export function ClassroomMap({ devices, occupancy }: ClassroomMapProps) {
  const getDeviceState = (id: string) => devices.find(d => d.id === id)?.isOn;

  const mainLightsOn = getDeviceState('1');
  const ac1On = getDeviceState('2');
  const projectorOn = getDeviceState('3');
  const ac2On = getDeviceState('4');

  return (
    <div className="relative w-full h-[400px] border rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 shadow-inner">
      {/* Floor Texture/Grid */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]"></div>

      {/* Classroom Layout - Top Down */}
      
      {/* Front Wall (Whiteboard) */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-slate-300 rounded-full shadow-sm"></div>
      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-xs text-slate-400 font-mono tracking-widest">SMART CLASSROOM 101</div>

      {/* Projector Screen Area */}
      <div className={cn(
        "absolute top-12 left-1/2 -translate-x-1/2 w-1/2 h-32 rounded-lg transition-all duration-1000",
        projectorOn ? "bg-blue-100/50 shadow-[0_0_50px_rgba(59,130,246,0.5)] border-blue-200/30" : "bg-transparent border border-dashed border-slate-300/30"
      )}>
        {projectorOn && (
            <div className="flex items-center justify-center h-full text-blue-500/20 font-bold text-4xl animate-pulse">
                PRESENTATION
            </div>
        )}
      </div>

      {/* Main Lights Overlay */}
      <div className={cn(
        "absolute inset-0 pointer-events-none transition-all duration-700 mix-blend-overlay",
        mainLightsOn ? "bg-yellow-100/30" : "bg-black/60"
      )}></div>

      {/* AC Units */}
      <div className="absolute left-0 top-1/4 -translate-y-1/2 p-2 bg-white dark:bg-slate-800 rounded-r-lg shadow-md border-y border-r border-slate-200 dark:border-slate-700">
        <Fan className={cn("w-6 h-6 text-slate-400", ac1On && "text-blue-500 animate-spin")} />
        {ac1On && <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 flex space-x-1">
            <span className="w-1 h-1 bg-blue-300 rounded-full animate-ping opacity-75"></span>
            <span className="w-1 h-1 bg-blue-300 rounded-full animate-ping delay-75 opacity-75"></span>
            <span className="w-1 h-1 bg-blue-300 rounded-full animate-ping delay-150 opacity-75"></span>
        </div>}
      </div>

      <div className="absolute right-0 top-3/4 -translate-y-1/2 p-2 bg-white dark:bg-slate-800 rounded-l-lg shadow-md border-y border-l border-slate-200 dark:border-slate-700">
        <Fan className={cn("w-6 h-6 text-slate-400", ac2On && "text-blue-500 animate-spin")} />
         {ac2On && <div className="absolute right-full top-1/2 -translate-y-1/2 mr-2 flex space-x-1">
            <span className="w-1 h-1 bg-blue-300 rounded-full animate-ping opacity-75"></span>
            <span className="w-1 h-1 bg-blue-300 rounded-full animate-ping delay-75 opacity-75"></span>
            <span className="w-1 h-1 bg-blue-300 rounded-full animate-ping delay-150 opacity-75"></span>
        </div>}
      </div>

      {/* Desks (Grid Layout) */}
      <div className="absolute inset-0 pt-48 px-16 pb-16 grid grid-cols-4 grid-rows-3 gap-8 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="relative bg-amber-100 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-md shadow-sm">
                {/* Chair */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"></div>
                {i < occupancy && (
                    <User className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 text-emerald-500 fill-emerald-500/20 animate-bounce delay-[${i * 100}ms]" />
                )}
            </div>
        ))}
      </div>

      {/* Light Source Indicators (Ceiling) */}
      <div className="absolute inset-x-0 top-1/2 flex justify-around pointer-events-none">
         <div className={cn("w-32 h-32 rounded-full blur-3xl transition-opacity duration-700", mainLightsOn ? "bg-yellow-200/40 opacity-100" : "opacity-0")}></div>
         <div className={cn("w-32 h-32 rounded-full blur-3xl transition-opacity duration-700", mainLightsOn ? "bg-yellow-200/40 opacity-100" : "opacity-0")}></div>
      </div>

    </div>
  );
}
