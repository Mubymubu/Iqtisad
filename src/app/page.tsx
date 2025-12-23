import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');

  return (
    <div className="flex flex-col">
      <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center text-center text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 px-4">
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4 italic">
            Welcome to Iqtisad
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-neutral-200">
            Discover how psychology shapes financial markets. A learning environment to understand and navigate the cognitive biases that influence financial decision-making.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="group">
              <Link href="/tutorial">
                Start Tutorial
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 md:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-headline">Explore the Simulation</h2>
            <p className="text-muted-foreground mt-2">Three levels of increasing complexity to test your skills.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 border-2 border-primary/20 text-primary font-bold text-2xl mb-4">1</div>
                <h3 className="text-xl font-semibold mb-2">Level 1: Tech Stocks</h3>
                <p className="text-muted-foreground">Learn the basics by trading stocks in a stable, established market.</p>
            </div>
             <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 border-2 border-primary/20 text-primary font-bold text-2xl mb-4">2</div>
                <h3 className="text-xl font-semibold mb-2">Level 2: Venture Capital</h3>
                <p className="text-muted-foreground">Invest in high-risk, high-reward private companies with limited information.</p>
            </div>
             <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 border-2 border-primary/20 text-primary font-bold text-2xl mb-4">3</div>
                <h3 className="text-xl font-semibold mb-2">Level 3: Cryptocurrency</h3>
                <p className="text-muted-foreground">Navigate the highly volatile and unpredictable crypto market.</p>
            </div>
        </div>
      </section>
    </div>
  );
}
