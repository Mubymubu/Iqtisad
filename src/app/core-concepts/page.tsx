import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BookOpen } from "lucide-react";

const concepts = [
    {
      value: "prospect-theory",
      title: "Prospect Theory",
      definition: "According to Prospect Theory, individuals decide based on the potential gains and losses in comparison to a standard level, as opposed to analyzing the end result alone. It further demonstrates that losses tend to be more pronounced than the gains of equal magnitude and this affects our risk perception and decision-making process significantly.",
      example: "Finding $20 feels good, but losing $20 feels much worse. Because of this, someone might turn down a fair 50/50 bet to either win $100 or lose $100, because the fear of losing outweighs the excitement of winning.",
      inGame: "You will see that the loss of one of your assets may have a stronger emotional reaction compared to the gain of the same. This may cause you to sell a losing investment too fast so as to reduce the suffering even though it may be a good long-term investment.",
      mistake: "Selling a good asset in a panic just because its price dipped slightly.",
      alternative: "Focus on the asset's long-term potential, not short-term price movements. Make decisions based on your original plan, not on fear."
    },
    {
      value: "loss-aversion",
      title: "Loss Aversion",
      definition: "This is a major aspect of Prospect theory. It is our human instinct to want to evade any losses rather than gain the same. Psychological research indicates that loss pain is approximately two times stronger than the win pleasure.",
      example: "An investor holds onto a failing stock, hoping it will 'come back,' because selling would mean officially accepting the loss. They might sell a winning stock too early to 'lock in' the profit, fearing the gain will disappear.",
      inGame: "This is directly illustrated in the tutorial. You might have a desire to sell after the slight loss. At a later stage, you will be holding on to an asset that is not performing well, and you will be thinking that I will wait until it returns to the value I paid it.",
      mistake: "Holding onto losing investments for too long (and selling winning ones too soon).",
      alternative: "Set clear rules for selling before you invest. For example, decide to sell if an asset drops by 15% from its purchase price, and stick to that rule."
    },
    {
      value: "confirmation-bias",
      title: "Confirmation Bias",
      definition: "It is the tendency to interpret, favor, judge and remember information that maintains or reinforces previous beliefs or values. We prefer to be correct and, therefore, we unconsciously seek some evidence that will establish the fact that we are.",
      example: "If you believe a tech company is the 'next big thing,' you might only pay attention to positive news articles about it and ignore any negative reports or signs of trouble.",
      inGame: "In Level I, you will see ambiguous news headlines. If you've just bought an asset and it's doing well, you might interpret a vague headline like 'Aurex Computing Faces New Challenge' as a sign of the company's strength, while ignoring the potential risk.",
      mistake: "Only listening to information that agrees with your decision, creating an echo chamber.",
      alternative: "Actively seek out information that challenges your beliefs. Before making a decision, ask yourself, 'What is the argument against doing this?'"
    },
    {
      value: "overconfidence",
      title: "Overconfidence",
      definition: "This bias leads people to have excessive confidence in their own abilities, knowledge, and judgment. They may believe they are smarter and better at making decisions than they actually are, leading them to underestimate risks.",
      example: "An investor who has a few successful trades might start to believe they have a special talent for picking winners. They might then take on much bigger risks, believing they can't lose.",
      inGame: "In Level I, if you have some early success, you might feel an urge to invest more and more into a single asset, believing you've 'figured out the game.' This can lead to big losses if the market suddenly changes.",
      mistake: "Taking on too much risk after a string of successes, believing you're invincible.",
      alternative: "Remember that luck plays a big role in short-term market movements. Stick to your strategy, and don't let a few wins convince you to abandon your rules."
    },
    {
      value: "herd-behaviour",
      title: "Herd Behaviour",
      definition: "This is the tendency for individuals to follow the actions of a larger group, whether those actions are rational or not. It's driven by a desire to be part of the crowd and a fear of being left out or being wrong alone.",
      example: "During a market bubble, everyone seems to be buying a certain type of asset (like tech stocks in the late 1990s). People jump in, not because they've done research, but because they see others getting rich and fear missing out.",
      inGame: "In Level II, you will see what other 'investors' in the simulation are doing. You may feel pressure to invest in a startup just because it's popular, even if you have little information about its potential.",
      mistake: "Buying an asset simply because everyone else is, without doing your own thinking.",
      alternative: "Base your decisions on your own research and strategy. Be comfortable with being different from the crowd if your plan supports it."
    }
];

export default function CoreConceptsPage() {
  return (
    <div className="container max-w-4xl py-12 md:py-24">
      <div className="text-center mb-12">
        <BookOpen className="mx-auto h-12 w-12 text-primary mb-4" />
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">Core Concepts</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Understanding these key ideas from behavioural economics is the first step to mastering your financial decisions.
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {concepts.map((concept) => (
          <AccordionItem key={concept.value} value={concept.value}>
            <AccordionTrigger className="text-xl font-headline hover:no-underline text-left">
              {concept.title}
            </AccordionTrigger>
            <AccordionContent className="space-y-6 pt-2 text-base">
              <div>
                <h3 className="font-bold text-primary">Definition</h3>
                <p className="text-muted-foreground mt-1">{concept.definition}</p>
              </div>
              <div>
                <h3 className="font-bold text-primary">Real-World Example</h3>
                <p className="text-muted-foreground mt-1">{concept.example}</p>
              </div>
              <div>
                <h3 className="font-bold text-primary">In the Simulation</h3>
                <p className="text-muted-foreground mt-1">{concept.inGame}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-lg border bg-card/50 p-4">
                  <div>
                    <h4 className="font-semibold">Common Mistake</h4>
                    <p className="text-sm text-muted-foreground mt-1">{concept.mistake}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Disciplined Alternative</h4>
                    <p className="text-sm text-muted-foreground mt-1">{concept.alternative}</p>
                  </div>
              </div>

            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
