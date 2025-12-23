"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function TutorialPage() {
  const router = useRouter();

  return (
    <div className="container flex-1 flex items-center justify-center py-12">
      <Card className="w-full max-w-lg">
        <CardContent className="text-center pt-6">
          <h2 className="text-2xl font-bold mb-4 font-headline">Welcome to Iqtisad</h2>
          <p className="text-muted-foreground mb-2">This is a simulation. No real money is involved.</p>
          <p className="text-muted-foreground mb-2">The goal is to learn about your decision-making, not to 'win' or make the most money.</p>
          <p className="text-muted-foreground mb-6">Mistakes are valuable learning opportunities. Let's begin.</p>
          <Button onClick={() => router.push('/level-1')}>
            Go to Level 1 <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
