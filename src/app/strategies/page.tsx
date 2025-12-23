import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ShieldCheck, Scale, Target, BrainCog } from "lucide-react";

const strategies = [
  {
    icon: <Scale className="h-8 w-8 text-primary" />,
    title: "Diversification",
    description: "Don't put all your eggs in one basket. Spreading your investments across different assets reduces the impact if one of them performs poorly.",
    counters: "Overconfidence, Concentration Risk",
    effectiveWhen: "Always. It's a fundamental principle of managing risk. It's especially useful when you are uncertain about which single asset will perform best.",
    inGameReward: "In the simulation, a diversified portfolio will be more stable. You'll avoid huge losses from a single asset's crash, leading to a less stressful experience and better overall performance."
  },
  {
    icon: <Target className="h-8 w-8 text-primary" />,
    title: "Dollar-Cost Averaging",
    description: "Invest a fixed amount of money at regular intervals, regardless of the asset's price. This helps to average out your purchase price over time.",
    counters: "Herd Behaviour, FOMO, Market Timing",
    effectiveWhen: "You are making a long-term investment in a volatile market. It removes the emotional guesswork of trying to 'buy low and sell high.'",
    inGameReward: "By investing consistently, you'll automatically buy more shares when prices are low and fewer when they are high. This disciplined approach is rewarded in volatile levels like Level III (Crypto)."
  },
  {
    icon: <BrainCog className="h-8 w-8 text-primary" />,
    title: "Deliberate Reflection",
    description: "Before making any decision (buy or sell), pause and write down one reason TO make the trade and one reason NOT TO. This forces slower, more logical thinking.",
    counters: "Emotional Decision-Making, Impulse Trading",
    effectiveWhen: "During moments of high emotion, such as market panic or euphoria. It creates a critical gap between feeling an urge and acting on it.",
    inGameReward: "The game's debrief sections are a form of deliberate reflection. Practicing this during the simulation will help you identify your own biases and improve your scores in the debriefs."
  },
    {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: "Risk Limits (Stop-Loss)",
    description: "Decide in advance the maximum loss you are willing to tolerate on any single investment. If it hits that price, you sell—no questions asked.",
    counters: "Loss Aversion, Overconfidence",
    effectiveWhen: "In any investment. It provides a clear, emotion-free exit strategy and prevents a small loss from turning into a catastrophic one.",
    inGameReward: "Using a mental stop-loss in the game protects you from wiping out your portfolio. It forces you to accept small losses, preventing the 'hope and hold' strategy that loss aversion encourages."
  }
];

export default function StrategiesPage() {
  return (
    <div className="container max-w-5xl py-12 md:py-24">
      <div className="text-center mb-12">
        <ShieldCheck className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">Disciplined Strategies</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Translate your knowledge of biases into actionable strategies for better decision-making.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {strategies.map((strategy) => (
          <Card key={strategy.title}>
            <CardHeader className="flex flex-row items-start gap-4">
              {strategy.icon}
              <div>
                <CardTitle className="font-headline">{strategy.title}</CardTitle>
                <CardDescription>{strategy.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <h4 className="font-semibold">Counters This Bias:</h4>
                <p className="text-muted-foreground">{strategy.counters}</p>
              </div>
              <div>
                <h4 className="font-semibold">When It's Most Effective:</h4>
                <p className="text-muted-foreground">{strategy.effectiveWhen}</p>
              </div>
              <div>
                <h4 className="font-semibold">How the Game Rewards It:</h4>
                <p className="text-muted-foreground">{strategy.inGameReward}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
