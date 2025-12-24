

import { Card, CardContent } from "@/components/ui/card";
import { BookText, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export default function HowToPlayPage() {
  return (
    <div className="container max-w-4xl py-12 md:py-24">
      <div className="text-center mb-12">
        <BookText className="mx-auto h-12 w-12 text-primary mb-4" />
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl italic">
          Iqtisad — Game Manual
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">How to Play</p>
      </div>

      <div className="space-y-10 text-left">
        <section>
          <h2 className="font-headline text-2xl font-bold mb-4">Overview</h2>
          <p className="text-muted-foreground leading-relaxed">
            Iqtisad is a financial simulation educational game that is aimed at
            immersing in the dynamics of real-world markets. The game is
            focused on managing capital, analyzing price movements and making
            strategic investment decisions in 3 levels of increasing
            difficulty: Tech Stocks, Venture Capital and Crypto. Using
            simulated data that is realistic in nature, Iqtisad allows players
            to experience the excitement and risk of trading without the real
            world consequences of the transactions while teaching critical
            financial concepts in the process.
          </p>
        </section>

        <section>
          <h2 className="font-headline text-2xl font-bold mb-4">
            Starting the Game
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            At the start of every level players receive a certain amount of
            starting cash. The primary objective is to increase net worth
            through wise investment choices before time runs out. The game
            dashboard gives all the necessary information at a glance,
            including the time left, the current cash balance, the value of the
            portfolio, and the overall net worth. Players will need to pay

            close attention to these indicators to make sure their strategy is
            effective throughout the level.
          </p>
        </section>

        <section>
          <h2 className="font-headline text-2xl font-bold mb-4">
            Understanding Asset Cards
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            All the asset cards represent some separate investment opportunity, be it a company or a digital asset. Such cards indicate the actual price, change of percentage that displays profit/loss, and a live price trend chart over time. The charts are color-coded to enable easy use where a green chart represents a profit, and a red chart represents a loss. The graphs are dynamic, there is realistic movement in the market and the players have to keep on changing their strategies.
          </p>
        </section>

        <section>
          <h2 className="font-headline text-2xl font-bold mb-4">
            Buying and Selling
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Players can purchase an asset by clicking the Buy button at the current market price, and the owned assets can be sold by clicking the Sell button. Even after the transactions are made, asset prices are in a constant movement and therefore timing is a very important factor. All the transactions update instantaneously on the cash balance and portfolio value of the player, which gives them an incentive to plan and make careful decisions.
          </p>
          <Card className="mt-6 bg-card/50">
            <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Key Points:</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Timing and strategy is important; prices are constantly changing.</li>
                    <li>Portfolio value and cash balance are updated as soon as the trade is made.</li>
                </ul>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="font-headline text-2xl font-bold mb-4">
            Levels Explained
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The game is split into three levels with each level having its own
            purpose of teaching investing.
          </p>
            <div className="space-y-4">
                <h3 className="font-semibold text-lg">Level 1: Tech Stocks</h3>
                <p className="text-muted-foreground leading-relaxed">
                    This level is focused on publicly traded technology stocks. The
                    price movements are moderately volatile offering an ideal
                    introduction to market trends and basic timing strategies.
                </p>
                <h3 className="font-semibold text-lg">Level 2: Venture Capital</h3>
                <p className="text-muted-foreground leading-relaxed">
                    This level resembles investment in start-ups. Such assets are more risky and can higher returns be achieved. The price fluctuations are unreliable and the players must be good risk managers and have long-term strategies.
                </p>
                <h3 className="font-semibold text-lg">Level 3: Crypto</h3>
                <p className="text-muted-foreground leading-relaxed">
                    This level brings extreme market volatility and price changes.
                    This level challenges players with their emotional control, risk
                    tolerance, and ability to make quick and informed decisions
                    under pressure.
                </p>
            </div>
        </section>

        <section>
          <h2 className="font-headline text-2xl font-bold mb-4">
            Progress and Scoring
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Performance measurement is done on a system that utilizes net worth growth, decision quality and risk management evaluation. They save and follow the stars and keep a number of them in each level, which means that a player can see their progress and refine the strategies.
          </p>
        </section>
        
        <section>
          <h2 className="font-headline text-2xl font-bold mb-4">How to Earn Stars</h2>
          <div className="space-y-6">
            <Card className="bg-card/50">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg flex items-center">
                    <Star className="h-5 w-5 mr-1 text-yellow-400 fill-yellow-400" />
                    <Star className={cn("h-5 w-5 mr-1 text-muted-foreground/30")} />
                    <Star className={cn("h-5 w-5 mr-2 text-muted-foreground/30")} />
                    1 Star
                </h3>
                <p className="text-muted-foreground leading-relaxed mt-2">
                  To earn 1 star, the player must finish the level with a net worth increase of at least 5% compared to the starting capital and complete at least 2 trades.
                </p>
                <p className="text-sm text-muted-foreground/80 italic mt-2">
                  This shows that the player understands the basic idea of trading, actively participates in the market, and is able to make simple profitable decisions.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card/50">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg flex items-center">
                    <Star className="h-5 w-5 mr-1 text-yellow-400 fill-yellow-400" />
                    <Star className="h-5 w-5 mr-1 text-yellow-400 fill-yellow-400" />
                    <Star className={cn("h-5 w-5 mr-2 text-muted-foreground/30")} />
                    2 Stars
                </h3>
                <p className="text-muted-foreground leading-relaxed mt-2">
                  To earn 2 stars, the player must finish the level with a net worth increase of at least 15% and complete at least 5 trades.
                </p>
                <p className="text-sm text-muted-foreground/80 italic mt-2">
                  This reflects stronger engagement with the market and the ability to grow capital through multiple, deliberate trading decisions rather than relying on chance.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card/50">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg flex items-center">
                    <Star className="h-5 w-5 mr-1 text-yellow-400 fill-yellow-400" />
                    <Star className="h-5 w-5 mr-1 text-yellow-400 fill-yellow-400" />
                    <Star className="h-5 w-5 mr-2 text-yellow-400 fill-yellow-400" />
                    3 Stars
                </h3>
                <p className="text-muted-foreground leading-relaxed mt-2">
                  To earn 3 stars, the player must finish the level with a net worth increase of at least 30% and have more winning trades than losing trades.
                </p>
                <p className="text-sm text-muted-foreground/80 italic mt-2">
                  This represents consistent performance and good judgment, showing that the player can remain profitable across several trades while adapting to market conditions.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="font-headline text-2xl font-bold mb-4">Objective</h2>
          <p className="text-muted-foreground leading-relaxed">
            Iqtisad is not the search of definite winning strategy. It is directed toward getting players to learn market behaviour, learn to balance risk and reward, and make decision making in the uncertainty environment. The game does not rely much on luck but rather patience, discipline, and a well-educated strategy, which is a perfect way of learning some practical financial skills.
          </p>
        </section>
      </div>
    </div>
  );
}
