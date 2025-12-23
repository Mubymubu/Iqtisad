
import { Button } from "@/components/ui/button";
import { ArrowRight, Newspaper, TrendingUp, Cpu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');
  const logoImage = PlaceHolderImages.find(p => p.id === 'iqtisad-logo-full');

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
             Iqtisad: An educational platform for understanding financial markets and economic decision-making.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" className="group">
              <Link href="/tutorial">
                Explore Iqtisad
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl text-left">
            <h2 className="text-3xl font-bold font-headline mb-6">Why the Name Iqtisad?</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>The name Iqtisad is derived from the Arabic word for economics and reflects the significant role Arab scholars played in shaping foundational economic and financial ideas that influence modern markets today. During the Islamic Golden Age, Arab thinkers developed early concepts of trade ethics, market regulation, contracts, risk-sharing, and financial accountability—principles that underpin contemporary stock markets and financial systems.</p>
              <p>Practices such as partnerships, profit-and-loss sharing, transparent record-keeping, and regulated marketplaces were formalized long before modern exchanges existed. By choosing the name Iqtisad, this platform acknowledges those historical contributions while emphasizing balance, structured decision-making, and responsible economic thinking, which are central to understanding today’s global financial markets.</p>
            </div>
        </div>
      </section>
      
      <section className="bg-card/10">
        <div className="container mx-auto px-4 py-16 md:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
            <div>
                 <h2 className="text-3xl font-bold font-headline mb-4">Overview</h2>
                 <div className="space-y-4 text-muted-foreground">
                    <p>Iqtisad is designed to help students learn how financial markets work in a clear and structured way. The platform uses simplified explanations and real-world examples to make complex concepts easier to understand.</p>
                    <p>Rather than focusing on real investing, Iqtisad emphasizes learning. Users can explore how markets behave, how trading decisions are made, and how economic events influence financial systems—all in a risk-free environment.</p>
                 </div>
            </div>
             <div>
                <h2 className="text-3xl font-bold font-headline mb-4">What You Can Explore</h2>
                <ul className="space-y-4">
                    <li className="flex items-start gap-4">
                        <div className="bg-primary/10 p-2 rounded-full mt-1">
                            <TrendingUp className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h4 className="font-semibold">Simulated market scenarios</h4>
                        </div>
                    </li>
                     <li className="flex items-start gap-4">
                        <div className="bg-primary/10 p-2 rounded-full mt-1">
                            <Newspaper className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h4 className="font-semibold">Financial news and educational articles</h4>
                        </div>
                    </li>
                     <li className="flex items-start gap-4">
                        <div className="bg-primary/10 p-2 rounded-full mt-1">
                            <Cpu className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h4 className="font-semibold">Fundamental trading and economic concepts</h4>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
      </section>

      <section className="bg-card/20 py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 flex justify-center">
           {logoImage && (
              <Image 
                src={logoImage.imageUrl} 
                alt={logoImage.description}
                width={400} 
                height={400} 
                className="rounded-lg" 
                data-ai-hint={logoImage.imageHint}
              />
           )}
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
