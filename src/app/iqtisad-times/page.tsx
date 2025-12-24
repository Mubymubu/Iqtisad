
import { MarketNews } from "@/components/MarketNews";
import { TopMovers } from "@/components/TopMovers";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BookOpen } from "lucide-react";

const articles = [
  {
    title: "2016 Demonetisation in India",
    author: "Karim Bin Abdullah",
    content: [
      "On November 9, 2016, the Government of India announced the demonetisation of ₹500 and ₹1,000 currency notes, rendering them invalid overnight. This decision aimed to curb black money, counterfeit currency, and illegal financial activities, while also encouraging a shift toward digital payments.",
      "The abrupt loss of high-value notes disrupted the situation on a short basis. Small businesses, daily wage earners and rural markets relying mostly on cash transactions were impacted by crunch in terms of cash shortages. There was a huge congestion in banks and ATMs as the citizens were changing old notes with new ones.",
      "In the long run, demonetisation boosted the use of digital payment systems and formal banking involvement. Its effectiveness in removing black money is, however, still disputed among the economists. The incident has stood out to be one of the most prominent and contentious monetary policy moves in the Indian economic history."
    ]
  },
  {
    title: "The 2008 Global Financial Crisis",
    author: "Sophia Smith",
    content: [
        "The Global Financial Crisis experienced between January 2008 and March 2009 was one of the worst economic recessions, since the Great Depression. It began in the United States because of the meltdown of the housing market and the prevalent use of high risk mortgage-backed securities.",
        "Financial institutions of great size were insolvent and this resulted in the failure of banks causing stock market crashes and a high rate of unemployment across the world. Governments and the central banks came in to bail out the economy with massive bailouts, stimulus packages, and reduction of interest rates in order to avoid complete economic breakdown.",
        "The weak financial regulation and risk management were revealed during the crisis. This saw the introduction of tougher banking laws and regulatory structures around the world. The crisis of 2008 redefined the current financial structures and still plays a role in economic policy making."
    ]
  },
  {
    title: "The COVID-19 Economic Shock",
    author: "N’golo Robert",
    content: [
      "The COVID-19 economic crisis, which began in early 2020, caused a sudden and severe disruption to the global economy. Government-imposed lockdowns and travel restrictions halted production, reduced consumer spending, and led to widespread job losses across multiple sectors.",
      "Financial markets experienced extreme volatility as uncertainty spread, with major stock indices falling sharply in the early months of the pandemic. In response, governments and central banks implemented unprecedented fiscal stimulus measures, including emergency spending programs and near-zero interest rates.",
      "While these actions helped stabilize economies, they also increased public debt and inflationary pressures in the years that followed. The COVID-19 shock highlighted the interconnected nature of global economies and the importance of resilience in financial systems."
    ]
  }
];

export default function IqtisadTimesPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <section className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter italic">
          The اقتصاد Times
        </h1>
        <p className="max-w-2xl mx-auto text-muted-foreground md:text-lg mt-2">
          Stay informed with the latest market news, analysis, and historical insights.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
            <MarketNews />

            <section>
                 <h2 className="text-2xl font-bold font-headline mb-4 flex items-center"><BookOpen className="mr-3 h-6 w-6" /> Articles</h2>
                 <div className="space-y-8">
                    {articles.map((article, index) => (
                        <Card key={index} className="bg-card/50">
                            <CardHeader>
                                <CardTitle className="font-headline text-2xl">{article.title}</CardTitle>
                                <CardDescription>By {article.author}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4 text-muted-foreground">
                                {article.content.map((paragraph, pIndex) => (
                                    <p key={pIndex}>{paragraph}</p>
                                ))}
                            </CardContent>
                        </Card>
                    ))}
                 </div>
            </section>
        </div>
        
        <div className="lg:col-span-1">
            <TopMovers />
        </div>

      </div>
    </div>
  );
}
