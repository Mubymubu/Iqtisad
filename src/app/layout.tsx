import type { Metadata } from 'next';
import './globals.css';
import { ProgressProvider } from '@/context/ProgressProvider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Iqtisad: Behavioral Economics Simulator',
  description: 'An online simulation that teaches adolescents how psychological biases influence financial decision-making under uncertainty.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ProgressProvider>
            <div className="relative flex min-h-screen flex-col bg-background">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
        </ProgressProvider>
      </body>
    </html>
  );
}
