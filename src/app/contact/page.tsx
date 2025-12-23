"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
})

export default function ContactUsPage() {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", message: "" },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    toast({
      title: "Feedback Submitted!",
      description: "Thank you for your feedback. We'll use it to improve Iqtisad.",
    })
    form.reset()
  }

  return (
    <div className="container max-w-3xl py-12 md:py-24">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Contact Us</CardTitle>
          <CardDescription>
            Your feedback is invaluable for improving the educational quality of this simulation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Feedback</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Tell us what you think..." className="min-h-[120px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-4">
                <Button type="submit">Submit Feedback</Button>
              </div>
            </form>
          </Form>
          <div className="mt-8 border-t pt-6">
            <h3 className="font-semibold">Ethical Data Statement</h3>
            <p className="text-sm text-muted-foreground mt-2">
              We are committed to protecting the privacy of our users. All feedback is collected anonymously unless you voluntarily provide contact information. We do not sell or share your data with third parties. Data is used solely for the purpose of educational research and improving this platform.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
