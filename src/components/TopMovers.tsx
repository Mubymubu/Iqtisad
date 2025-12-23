
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

const topMovers = [
  { name: "AUREX", price: "$105.42", change: "+2.5%", changeType: "gain" },
  { name: "KALYX", price: "$98.17", change: "-1.8%", changeType: "loss" },
  { name: "SYNERON", price: "$102.33", change: "+1.2%", changeType: "gain" },
  { name: "VANTIQ", price: "$100.50", change: "+0.5%", changeType: "gain" },
];

export function TopMovers() {
    return (
        <div>
            <h2 className="text-2xl font-bold font-headline mb-4">Top Movers</h2>
            <Card>
                <CardContent className="p-0">
                     <div className="divide-y divide-border">
                        {topMovers.map((mover) => (
                          <div key={mover.name} className="p-4 flex justify-between items-center hover:bg-muted/50 transition-colors">
                            <div>
                                <p className="font-bold">{mover.name}</p>
                                <p className="text-sm text-muted-foreground">{mover.price}</p>
                            </div>
                            <div className={`flex items-center font-semibold ${mover.changeType === 'gain' ? 'text-green-400' : 'text-red-400'}`}>
                              {mover.changeType === 'gain' ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                              {mover.change}
                            </div>
                          </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
