
'use client';

import { Button } from "@/components/ui/button";
import { ArrowRight, Newspaper, TrendingUp, Cpu, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";
import { useUser, useDoc, useFirestore, useFirebaseApp } from "@/firebase";
import { doc } from "firebase/firestore";
import { useMemo } from "react";
import type { UserProgress } from "@/hooks/use-game-state";


const defaultLevels = [
  {
    level: 1,
    id: "level1" as const,
    title: "Level 1: Tech Stocks",
    description: "Trade volatile tech stocks in a fast-paced market. Learn to manage risk and capitalize on rapid price movements.",
    href: "/level-1",
    stars: 0,
  },
  {
    level: 2,
    id: "level2" as const,
    title: "Level 2: Venture Capital",
    description: "Invest in high-risk, high-reward private companies. Make strategic, long-term decisions to maximize your returns.",
    href: "/level-2",
    stars: 0,
  },
  {
    level: 3,
    id: "level3" as const,
    title: "Level 3: Crypto",
    description: "Navigate the unpredictable and highly volatile cryptocurrency market. Test your discipline against extreme market swings.",
    href: "/level-3",
    stars: 0,
  }
];


function LevelCard({ level, title, description, href, stars }: {
    level: number;
    title: string;
    description: string;
    href: string;
    stars: number;
}) {
  return (
    <div className="w-full max-w-2xl text-center py-8 relative">
        
        <h2 className="text-3xl font-bold mb-3 font-headline">{title}</h2>
        <p className="text-muted-foreground max-w-lg mx-auto mb-6">{description}</p>
        <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-sm text-muted-foreground">Your progress:</span>
            <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                    <Star key={i} className={cn("h-5 w-5", i < stars ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/30')} />
                ))}
            </div>
        </div>
        <Button asChild className="group">
            <Link href={href}>
                Play Level {level}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
        </Button>
    </div>
  )
}


export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');
  
  // Use try-catch to handle cases where Firebase is not available (SSR)
  let user = null;
  let firestore = null;
  
  try {
    const userData = useUser();
    const firestoreData = useFirestore();
    user = userData.user;
    firestore = firestoreData;
  } catch (error) {
    // Firebase not available during SSR, use default values
    console.log('Firebase not available during SSR');
  }
  
  const userProgressRef = useMemo(() => {
    if (!firestore || !user) return null;
    return doc(firestore, "users", user.uid);
  }, [firestore, user]);

  const { data: userProgress } = useDoc<UserProgress>(userProgressRef);

  const levels = useMemo(() => {
    if (!userProgress || !userProgress.progress) return defaultLevels;

    return defaultLevels.map(level => {
      const progress = userProgress.progress?.[level.id];
      return {
        ...level,
        stars: progress?.stars || 0
      }
    });

  }, [userProgress]);

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

      <section className="bg-card/10">
        <div className="container mx-auto px-4 py-16 md:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
            <div>
                 <h2 className="text-3xl font-bold font-headline mb-4">Overview</h2>
                 <div className="space-y-4 text-muted-foreground">
                    <p>Iqtisad is an educational game that involves trading and modern gaming to render the process of learning about financial markets in an interesting and interactive manner. The platform transforms the complex ideas in the stock market by incorporating levels, resources and simulated decision-making into a game. Within a well-organized, risk free learning rather than real investment environment, students study how markets operate, how trading decisions are made and how to respond to the economic happenings in terms of price.</p>
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

      <section className="bg-background py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-left">
             <h2 className="text-3xl font-bold font-headline mb-6">Iqtisad: an Education in the Real Markets.</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>Iqtisad is a simulated investment game whereby adolescents are supposed to learn about the operations of real markets by experience rather than memorizing. Rather, players control capital, learn about price changes, and strategically decide in changing market settings instead of passively learning. In a structured and age-appropriate manner, the game imparts fundamental economic theories like risk, reward, volatility, and long-term thinking. With the help of the simulation process based on the technology stocks, venture capital, and cryptocurrency, players can learn to think analytically, be financially aware, and emotionally managed. The Iqtisad objective is to establish a solid ground on market literacy and decision making enabling adolescents to face economic systems with clarity, discipline and confidence.</p>
            </div>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold font-headline mb-6">Why The Name Iqtisad(اقتصاد)?</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>The name Iqtisad is based on the Arabic word for economics and represents the important role played by Arab scholars in establishing basic economic and financial concepts that affect modern markets today. During the Islamic Golden Age, Arab thinkers began to establish early ideas on ethics of trade, regulation of markets, and contracts, sharing of risk, and financial accountability, as the foundation of today's stock markets and financial systems.</p>
                <p>Partnerships, profit, and loss sharing, open record keeping, controlled market places have all been institutionalized way before the modern day engagements. Through the name, Iqtisad, this platform serves as a tribute to those historical inputs but puts emphasis on the balance, systematic decision-making, and accountable economic reasoning which holds a key position in the interpretation of the modern world financial markets.</p>
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src="/home1.png"
                alt="Historical Islamic economics illustration"
                width={600}
                height={450}
                className="object-cover shadow-lg border-2 border-black"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold font-headline">Explore the Simulation</h2>
                <p className="text-muted-foreground mt-2">Three levels of increasing complexity to test your skills.</p>
            </div>
            <div className="flex flex-col items-center">
              {levels.map((level) => (
                <LevelCard key={level.level} {...level} />
              ))}
            </div>
        </div>
      </section>
    </div>
  );
}
