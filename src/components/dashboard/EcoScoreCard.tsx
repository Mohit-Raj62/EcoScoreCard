
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Trophy } from "lucide-react";

interface EcoScoreCardProps {
  score: number; // 0-100
  savings: number; // in currency
}

export function EcoScoreCard({ score, savings }: EcoScoreCardProps) {
  const getGrade = (s: number) => {
    if (s >= 90) return 'A+';
    if (s >= 80) return 'A';
    if (s >= 70) return 'B';
    if (s >= 60) return 'C';
    return 'D';
  };

  const grade = getGrade(score);
  const color = score >= 80 ? 'text-green-500' : score >= 60 ? 'text-yellow-500' : 'text-red-500';

  return (
    <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200 dark:from-green-950/20 dark:to-emerald-900/10">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium text-green-700 dark:text-green-400">
          Eco Efficiency Score
        </CardTitle>
        <Leaf className="h-5 w-5 text-green-600" />
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
            <div>
                <div className={`text-4xl font-bold ${color}`}>
                {grade} <span className="text-lg text-muted-foreground font-normal">({score}/100)</span>
                </div>
                <p className="text-xs text-green-600/80 mt-1 font-medium">
                    Top 5% of classrooms today!
                </p>
            </div>
            <div className="text-right">
                 <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Est. Savings</div>
                 <div className="text-2xl font-bold text-emerald-600 flex items-center justify-end">
                    <span className="mr-1">₹</span>
                    {savings.toFixed(2)}
                 </div>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
