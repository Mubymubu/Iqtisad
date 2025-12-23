"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useProgress } from "@/context/ProgressProvider";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle } from "lucide-react";

type Emotion = 'calm' | 'excited' | 'anxious' | 'regretful';

export default function TutorialPage() {
  const [step, setStep] = useState(1);
  const [price, setPrice] = useState(100.00);
  const [initialDecision, setInitialDecision] = useState<'buy' | 'nothing' | null>(null);
  const [priceChange, setPriceChange] = useState(0);
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const [showLossAversion, setShowLossAversion] = useState(false);
  
  const { setTutorialCompleted } = useProgress();
  const router = useRouter();

  const handleNextStep = () => setStep(s => s + 1);

  const handleInitialDecision = (decision: 'buy' | 'nothing') => {
    setInitialDecision(decision);
    const change = (Math.random() - 0.4) * 5; // Skewed slightly positive
    setPriceChange(change);
    setPrice(p => p + change);
    handleNextStep();
  };
  
  const handleEmotionSelect = (emotion: Emotion) => {
    setSelectedEmotion(emotion);
    handleNextStep();
  };
  
  const finishTutorial = () => {
    setTutorialCompleted(true);
    handleNextStep();
  }

  const renderStep = () => {
    switch (step) {
      case 1: // Orientation
        return (
          <CardContent className="text-center">
            <h2 className="text-2xl font-bold mb-4 font-headline">Welcome to the Tutorial</h2>
            <p className="text-muted-foreground mb-2">This is a simulation. No real money is involved.</p>
            <p className="text-muted-foreground mb-2">The goal is to learn about your decision-making, not to 'win' or make the most money.</p>
            <p className="text-muted-foreground mb-6">Mistakes are valuable learning opportunities. Let's begin.</p>
            <Button onClick={handleNextStep}>Start <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </CardContent>
        );
      case 2: // Single Asset Introduction
        return (
          <CardContent>
            <h2 className="text-2xl font-bold mb-2 font-headline">Step 1: Your First Decision</h2>
            <p className="text-muted-foreground mb-4">Here is a fictional asset. You have two choices.</p>
            <Card className="text-center p-6 mb-6">
              <CardTitle>NEXORA SYSTEMS</CardTitle>
              <p className="text-4xl font-bold my-2">${price.toFixed(2)}</p>
            </Card>
            <div className="flex justify-center gap-4">
              <Button onClick={() => handleInitialDecision('buy')}>Buy</Button>
              <Button variant="outline" onClick={() => handleInitialDecision('nothing')}>Do Nothing</Button>
            </div>
          </CardContent>
        );
      case 3: // Price Movement
        return (
          <CardContent>
            <h2 className="text-2xl font-bold mb-2 font-headline">Step 2: The Outcome</h2>
            <p className="text-muted-foreground mb-4">You chose to {initialDecision}. Here's what happened:</p>
            <Card className="text-center p-6 mb-6">
              <CardTitle>NEXORA SYSTEMS</CardTitle>
              <p className={`text-4xl font-bold my-2 ${priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${price.toFixed(2)}
              </p>
              <p className="text-muted-foreground">Change: ${priceChange.toFixed(2)}</p>
            </Card>
            <p className="text-center text-sm bg-accent/30 p-3 rounded-md">
              <strong>Important:</strong> Short-term price movement does not determine if a decision was good or bad. Good decisions can have bad outcomes, and vice-versa.
            </p>
            <div className="text-center mt-6">
              <Button onClick={handleNextStep}>Continue <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </div>
          </CardContent>
        );
      case 4: // Emotional Reflection
        return (
          <CardContent>
             <h2 className="text-2xl font-bold mb-2 font-headline">Step 3: Emotional Check-in</h2>
            <p className="text-muted-foreground mb-6">How did that price change make you feel? Be honest.</p>
            <RadioGroup onValueChange={(v: Emotion) => handleEmotionSelect(v)} className="grid grid-cols-2 gap-4">
              {(['calm', 'excited', 'anxious', 'regretful'] as Emotion[]).map(emotion => (
                <Label key={emotion} htmlFor={emotion} className="flex items-center space-x-2 border rounded-md p-4 hover:bg-accent/50 cursor-pointer has-[:checked]:bg-accent has-[:checked]:text-accent-foreground">
                  <RadioGroupItem value={emotion} id={emotion} />
                  <span className="font-medium capitalize">{emotion}</span>
                </Label>
              ))}
            </RadioGroup>
          </CardContent>
        );
      case 5: // Introduce Selling & Loss Aversion
        return (
          <CardContent>
            <h2 className="text-2xl font-bold mb-2 font-headline">Step 4: Loss Aversion</h2>
            <p className="text-muted-foreground mb-4">Now, the 'Sell' option is available. Let's explore a common bias.</p>
            <div className="p-4 border rounded-lg space-y-4">
              <div className="text-center">
                 <p className="font-bold text-lg">A $10 gain feels good.</p>
                 <p className="text-2xl font-bold text-green-600">+ $10</p>
              </div>
              <div className="text-center">
                 <p className="font-bold text-lg">But a $10 loss feels TERRIBLE.</p>
                 <p className="text-2xl font-bold text-red-600">- $10</p>
              </div>
            </div>
             <p className="text-center mt-4 text-sm bg-accent/30 p-3 rounded-md">
               This is <strong>Loss Aversion</strong>. The pain of losing is psychologically about twice as powerful as the pleasure of gaining. This can lead to irrational decisions.
            </p>
             <div className="text-center mt-6">
              <Button onClick={finishTutorial}>Finish Tutorial <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </div>
          </CardContent>
        );
      case 6: // Debrief
        return (
          <CardContent className="text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2 font-headline">Tutorial Complete!</h2>
            <p className="text-muted-foreground mb-4">
              You've taken your first step. You made a choice and saw an outcome. You reflected on your emotional response ({selectedEmotion}).
            </p>
            <p className="text-muted-foreground mb-6">
              Remembering that losses feel worse than gains is key. These instincts will be tested in the simulation levels.
            </p>
            <Button size="lg" onClick={() => router.push('/level-1')}>
              Proceed to Level I
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container flex-1 flex items-center justify-center py-12">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-center">Iqtisad Onboarding</CardTitle>
          <CardDescription className="text-center">Progress: Step {step > 5 ? 5 : step} of 5</CardDescription>
        </CardHeader>
        {renderStep()}
      </Card>
    </div>
  );
}
