
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Sparkles } from "lucide-react";

interface AIToggleProps {
  enabled: boolean;
  onToggle: (checked: boolean) => void;
}

export function AIToggle({ enabled, onToggle }: AIToggleProps) {
  return (
    <div className="flex items-center space-x-2 bg-primary/10 p-2 rounded-lg border border-primary/20">
      <Switch id="ai-mode" checked={enabled} onCheckedChange={onToggle} />
      <Label htmlFor="ai-mode" className="flex items-center cursor-pointer font-semibold text-primary">
        <Sparkles className="h-4 w-4 mr-2 text-yellow-500 fill-yellow-500" />
        AI Auto-Pilot
      </Label>
    </div>
  );
}
