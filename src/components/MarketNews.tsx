
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Newspaper } from "lucide-react";

const news = [
    {
      source: "TechPulse",
      headline: "Aurex Computing Unveils New Quantum-Inspired Chip",
      time: "2h ago",
      sentiment: "Positive",
    },
    {
      source: "MarketWatch",
      headline: "Analysts Raise Concerns Over Kalyx Dataworks' Q3 Earnings",
      time: "4h ago",
      sentiment: "Negative",
    },
    {
      source: "AI Today",
      headline: "Syneron AI Partners with Major Automaker for Autonomous Driving",
      time: "5h ago",
      sentiment: "Positive",
    },
    {
      source: "BioInvest",
      headline: "Vantiq Labs Faces Regulatory Scrutiny Over New Drug Trial",
      time: "8h ago",
      sentiment: "Negative",
    },
];

export function MarketNews() {
    return (
        <div>
            <h2 className="text-2xl font-bold font-headline mb-4 flex items-center"><Newspaper className="mr-3 h-6 w-6" /> Market News</h2>
             <Card>
                <CardContent className="p-0">
                    <div className="divide-y divide-border">
                        {news.map((item, index) => (
                            <div key={index} className="p-4 hover:bg-muted/50 transition-colors">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-sm font-semibold">{item.headline}</p>
                                        <p className="text-xs text-muted-foreground">{item.source} &middot; {item.time}</p>
                                    </div>
                                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${item.sentiment === 'Positive' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                        {item.sentiment}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
