import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Gamepad2, GraduationCap, BrainCircuit } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import placeholderImages from "@/lib/placeholder-images.json";

const heroImage = placeholderImages.placeholderImages.find(img => img.id === "hero");

export default function Home() {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            {heroImage && (
               <Image
                alt="Abstract representation of financial markets"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                height="600"
                src={heroImage.imageUrl}
                width="600"
                data-ai-hint={heroImage.imageHint}
              />
            )}
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-4">
                <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Iqtisad: A Behavioural Economics Simulation
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Discover how psychology shapes financial markets. Iqtisad is a learning environment designed for adolescents aged 10–17 to understand and navigate the cognitive biases that influence decision-making under uncertainty.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="group">
                  <Link href="/tutorial">
                    Start Tutorial
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">The Levels</div>
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">A Journey of Increasing Complexity</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Progress through three distinct levels, each designed to test your discipline against different psychological pressures.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
            <Card>
              <CardHeader className="items-center text-center">
                <Gamepad2 className="h-10 w-10 text-primary mb-4" />
                <CardTitle className="font-headline">Level I: Tech Stocks</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">Experience the pull of overconfidence and confirmation bias in a fast-moving digital market.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="items-center text-center">
                <BrainCircuit className="h-10 w-10 text-primary mb-4" />
                <CardTitle className="font-headline">Level II: Venture Capital</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">Navigate uncertainty and herd behavior with long-term, high-stakes investments.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="items-center text-center">
                <GraduationCap className="h-10 w-10 text-primary mb-4" />
                <CardTitle className="font-headline">Level III: Crypto</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">Master your emotions amidst extreme volatility and the fear of missing out (FOMO).</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
