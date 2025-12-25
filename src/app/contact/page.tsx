
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, User, ShieldAlert, Share2 } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container max-w-3xl py-12 md:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">Contact Us</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Get in touch with the creator of Iqtisad.
        </p>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Mail className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>Contact Information</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-2">
              For questions, feedback, or academic inquiries related to Iqtisad, please contact:
            </p>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Email:</span>
              <a href="mailto:ammarvasee@gmail.com" className="text-primary hover:underline">
                ammarvasee@gmail.com
              </a>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <User className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>About the Creator</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Hello! My name is <span className="font-semibold text-foreground">Ammar Vasee</span>. I am a Grade 10 student at Sreenidhi International School, Hyderabad. I created Iqtisad as an educational project to explore financial markets, economics, and trading concepts through interactive learning.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <ShieldAlert className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>Disclaimer</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Iqtisad is an educational project. The content provided is for learning purposes only and does not constitute financial or investment advice.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Share2 className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>Social Media Pages</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Connect with Iqtisad on social media.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
