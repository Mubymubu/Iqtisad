import Link from "next/link";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function LockedPage({ levelName, requiredLevel }: { levelName: string; requiredLevel: string; }) {
  const getRequiredLevelPath = () => {
    switch (requiredLevel) {
      case "the Tutorial":
        return "/tutorial";
      case "Level I":
        return "/level-1";
      case "Level II":
        return "/level-2";
      default:
        return "/tutorial";
    }
  };
  
  return (
    <div className="container flex items-center justify-center flex-1 py-12">
        <Card className="w-full max-w-md text-center shadow-lg">
            <CardHeader>
                <div className="mx-auto bg-muted rounded-full p-4 w-fit">
                    <Lock className="h-8 w-8 text-muted-foreground" />
                </div>
                <CardTitle className="mt-4 font-headline text-2xl">
                  {levelName} is Locked
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-6">
                    You must complete {requiredLevel} before accessing this level.
                </p>
                <Button asChild>
                    <Link href={getRequiredLevelPath()}>
                        Go to {requiredLevel}
                    </Link>
                </Button>
            </CardContent>
        </Card>
    </div>
  );
}
