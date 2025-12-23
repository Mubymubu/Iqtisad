
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
      "The sudden withdrawal of high-value notes caused short-term disruption. Cash shortages affected small businesses, daily wage workers, and rural markets that relied heavily on cash transactions. Banks and ATMs experienced heavy pressure as citizens exchanged old notes for new currency.",
      "In the long term, demonetisation accelerated the adoption of digital payment systems and increased formal banking participation. However, economists continue to debate its effectiveness in eliminating black money. The event remains one of the most significant and controversial monetary policy decisions in India’s economic history."
    ]
  },
  {
    title: "The 2008 Global Financial Crisis",
    author: "Sophia Smith",
    content: [
        "The Global Financial Crisis, which lasted from January 2008 to March 2009, was one of the most severe economic downturns since the Great Depression. It originated in the United States due to the collapse of the housing market and the widespread use of high-risk mortgage-backed securities.",
        "Major financial institutions faced insolvency, leading to bank failures, stock market crashes, and a sharp rise in unemployment worldwide. Governments and central banks intervened through large-scale bailouts, stimulus packages, and interest rate cuts to prevent total economic collapse.",
        "The crisis exposed weaknesses in financial regulation and risk management. As a result, stricter banking regulations and oversight frameworks were introduced globally. The 2008 crisis reshaped modern financial systems and continues to influence economic policy decisions today."
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
