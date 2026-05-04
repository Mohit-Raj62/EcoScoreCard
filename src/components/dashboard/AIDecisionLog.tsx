
import { ScrollArea } from "@/components/ui/scroll-area";
import { Terminal } from "lucide-react";

interface DecisionLog {
  id: string;
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'warning';
}

interface AIDecisionLogProps {
  logs: DecisionLog[];
}

export function AIDecisionLog({ logs }: AIDecisionLogProps) {
  return (
    <div className="rounded-xl border bg-black text-green-400 font-mono text-sm shadow-sm h-[300px] flex flex-col overflow-hidden">
      <div className="flex items-center gap-2 border-b border-gray-800 bg-gray-900/50 p-3 shrink-0">
        <Terminal className="h-4 w-4" />
        <span className="font-semibold">AI_CORE_TERMINAL</span>
        <div className="ml-auto flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500/20" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/20" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
        </div>
      </div>
      <ScrollArea className="flex-1 p-4 h-full">
        <div className="space-y-1.5">
          {logs.length === 0 && (
            <div className="text-gray-500 italic">Waiting for system events...</div>
          )}
          {logs.map((log) => (
            <div key={log.id} className="flex gap-2">
              <span className="text-gray-500 shrink-0">[{log.timestamp}]</span>
              <span className={
                log.type === 'warning' ? 'text-yellow-400' :
                log.type === 'success' ? 'text-green-400' :
                'text-blue-400'
              }>
                {log.type === 'warning' && '⚠ '}
                {log.type === 'success' && '✔ '}
                {log.type === 'info' && 'ℹ '}
                {log.message}
              </span>
            </div>
          ))}
          <div className="animate-pulse">_</div>
        </div>
      </ScrollArea>
    </div>
  );
}
