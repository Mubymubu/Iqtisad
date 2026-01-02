
import { MarketNews } from "@/components/MarketNews";
import { TopMovers } from "@/components/TopMovers";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BookOpen } from "lucide-react";
import Image from "next/image";

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
      "The COVID-19 economic crisis which led to an abrupt and negative shock in the economy of the world. Lockdowns and travel restrictions brought by governments stopped production and consumer spending and caused massive layoffs in various industries.",
      "There was extreme volatility in financial markets and the major stock markets plummeted at the beginning of the pandemic as uncertainty crept in. Governments and central banks responded with the highest levels of fiscal stimulus plans in history fiscal policies such as emergency spending programs and low-interest rates.",
      "Although these measures played the role of stabilizing economies they also added public debt and inflation pressures during the years that followed. The COVID-19 shock revealed the interdependence of the world economies and the significance of the resilience of financial systems."
    ]
  }
];

export default function IqtisadTimesPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <section className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter italic">
          The اقتصاد Financial Chronicles
        </h1>
        <p className="max-w-2xl mx-auto text-muted-foreground md:text-lg mt-2">
          Stay updated with the latest market news, analysis, and historical insights.
        </p>
      </section>

      <div className="grid grid-cols-1 gap-12">
        <div className="w-full space-y-12">
          <MarketNews />

          <section>
            <h2 className="text-2xl font-bold font-headline mb-4 flex items-center">
              <BookOpen className="mr-3 h-6 w-6" />
              Past & Profit – Lessons from the past that still matter
            </h2>

            <div className="space-y-8">
              {articles.map((article, index) => (
                <div key={index} className="flex flex-col lg:flex-row gap-6 items-stretch w-full">
                  {/* LEFT CONTENT CARD */}
                  <Card className="w-full lg:w-1/2 bg-card/50 flex flex-col">
                    <CardHeader>
                      <CardTitle className="font-headline text-xl lg:text-2xl">
                        {article.title}
                      </CardTitle>
                      <CardDescription>
                        By {article.author}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="flex-1 space-y-4 text-muted-foreground text-sm lg:text-base">
                      {article.content.map((paragraph, pIndex) => (
                        <p key={pIndex}>{paragraph}</p>
                      ))}
                    </CardContent>
                  </Card>

                  {/* RIGHT IMAGE CARD */}
                  <Card className="w-full lg:w-1/2 bg-card/50 p-0 overflow-hidden">
                    <div className="relative h-64 lg:h-full lg:min-h-[400px]">
                      <Image
                        src={`/chronicle${index + 1}.png`}
                        alt={`Chronicle ${index + 1} illustration`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority
                      />
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </section>
        </div>
        
        <div className="w-full">
          <TopMovers />
        </div>
      </div>
    </div>
  );
}
