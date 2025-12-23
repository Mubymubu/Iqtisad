import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
           <div className="flex items-center space-x-2">
            <Image src="/logo.svg" alt="Iqtisad Logo" width={24} height={24} />
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Iqtisad. All rights reserved.
            </p>
          </div>
          <nav className="flex gap-4 sm:gap-6">
            <Link href="/core-concepts" className="text-sm text-muted-foreground hover:text-primary">
              Core Concepts
            </Link>
            <Link href="/strategies" className="text-sm text-muted-foreground hover:text-primary">
              Strategies
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
              Contact
            </Link>
          </nav>
        </div>
        <div className="mt-6 text-center text-xs text-muted-foreground/50">
           <p>Iqtisad is a simulation for educational purposes only. Not financial advice.</p>
        </div>
      </div>
    </footer>
  );
}
