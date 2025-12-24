
import { Card, CardContent } from "@/components/ui/card";
import { BookText } from "lucide-react";

export default function HowToPlayPage() {
  return (
    <div className="container max-w-4xl py-12 md:py-24">
      <div className="text-center mb-12">
        <BookText className="mx-auto h-12 w-12 text-primary mb-4" />
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
          Iqtisad — Game Manual
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">How to Play</p>
      </div>

      <div className="space-y-10 text-left">
        <section>
          <h2 className="font-headline text-2xl font-bold mb-4">Overview</h2>
          <p className="text-muted-foreground leading-relaxed">
            Iqtisad is a financial simulation educational game designed to
            immerse in the dynamics of real-world markets. The game focuses on
            managing capital, analyzing price movements, and making strategic
            investment decisions in three levels of increasing difficulty: Tech
            Stocks, Venture Capital, and Crypto. Using simulated data that is
            realistic, Iqtisad lets players feel the excitement and risk of
            trading without the real-world consequences while teaching critical
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
            Each asset card is a representation of a unique investment
            opportunity, such as a company or digital asset. These cards show
            the current price, percentage change which represents profit/loss,
            and a live chart of price trends over time. Charts are color-coded
            for easy reference, with green showing a profit, and red indicating
            a loss. The charts change in real-time, with realistic
            fluctuations in the market, and players must adjust their
            strategies constantly.
          </p>
        </section>

        <section>
          <h2 className="font-headline text-2xl font-bold mb-4">
            Buying and Selling
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Players are able to buy an asset by clicking the Buy button at the
            current market price, and owned assets can be sold using the Sell
            button. Asset prices are constantly moving, even after the
            transactions so timing is a crucial factor. Every transaction
            immediately reflects the player's cash balance and portfolio value,
            providing incentives for careful planning and strategic
            decision-making.
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
                    This level simulates investments in early-stage startups. These
                    assets have a greater risk and potential for greater returns.
                    Price changes can be unpredictable, and players need to develop
                    long-term strategies and good risk management skills.
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
            Performance is measured with a system based on stars evaluating net
            worth growth, quality of decisions, and risk management. Stars are
            saved and kept track of individually for each level, meaning
            players can track their progress and improve their strategies.
          </p>
        </section>

        <section>
          <h2 className="font-headline text-2xl font-bold mb-4">Objective</h2>
          <p className="text-muted-foreground leading-relaxed">
            Iqtisad is not about finding a sure winning strategy. Its purpose
            is to help players understand how markets behave, learn how to
            balance risk and reward, and make better decisions under
            uncertainty. The game rewards patience, discipline, and informed
            strategy rather than luck, and serves as an ideal tool for
            developing practical financial skills.
          </p>
        </section>
      </div>
    </div>
  );
}
