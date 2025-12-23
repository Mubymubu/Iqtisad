import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { TopMovers } from "@/components/TopMovers";
import { MarketNews } from "@/components/MarketNews";

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
            <MarketNews />
        </div>
        
        <div>
            <TopMovers />
        </div>

      </div>
    </div>
  );
}
