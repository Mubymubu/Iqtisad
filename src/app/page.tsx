import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, TrendingUp, TrendingDown, Newspaper } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const topMovers = [
  { name: "AUREX", price: "$105.42", change: "+2.5%", changeType: "gain" },
  { name: "KALYX", price: "$98.17", change: "-1.8%", changeType: "loss" },
  { name: "SYNERON", price: "$102.33", change: "+1.2%", changeType: "gain" },
  { name: "VANTIQ", price: "$100.50", change: "+0.5%", changeType: "gain" },
];

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

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <section className="text-center mb-16">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter mb-4">
          Welcome to Iqtisad
        </h1>
        <p className="max-w-3xl mx-auto text-muted-foreground md:text-xl">
          Discover how psychology shapes financial markets. A learning environment to understand and navigate the cognitive biases that influence financial decision-making.
        </p>
        <div className="mt-8">
          <Button asChild size="lg" className="group">
            <Link href="/tutorial">
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
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

      </div>
    </div>
  );
}