
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import React from 'react';
import Image from 'next/image';
import { GameStateProvider, useGameStoreState } from '@/hooks/use-game-state.tsx';

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/tutorial", label: "Tutorial" },
  { href: "/level-1", label: "Level 1" },
  { href: "/level-2", label: "Level 2" },
  { href: "/level-3", label: "Level 3" },
  { href: "/core-concepts", label: "Core Concepts" },
  { href: "/strategies", label: "Strategies" },
  { href: "/contact", label: "Contact Us" },
];

const NavLink = ({ href, label, isSheet = false }: { href: string; label: string; isSheet?: boolean }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  const linkClasses = cn(
    "text-sm font-medium transition-colors hover:text-primary",
    isActive ? "text-primary" : "text-muted-foreground"
  );
  
  const sheetLinkClasses = cn(
    "text-lg font-medium transition-colors hover:text-primary",
    isActive ? "text-primary" : "text-foreground"
  );
  
  if (isSheet) {
    return (
      <SheetClose asChild>
        <Link href={href} className={sheetLinkClasses}>
          {label}
        </Link>
      </SheetClose>
    );
  }

  return (
    <Link href={href} className={linkClasses}>
      {label}
    </Link>
  );
};

const GameStateDisplay = () => {
    const { timeRemaining, cashBalance, portfolioValue, phase } = useGameStoreState();

    if (phase === 'intro' || phase === 'debrief' || !phase) return null;

    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value);
    }
    
    return (
        <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-muted-foreground"/>
                <div>
                   <div className="text-muted-foreground text-xs">Cash Balance</div>
                   <div className="font-semibold">{formatCurrency(cashBalance)}</div>
                </div>
            </div>
             <div className="flex items-center gap-2">
                <div className="text-right">
                   <div className="text-muted-foreground text-xs">Portfolio Value</div>
                   <div className="font-semibold">{formatCurrency(portfolioValue)}</div>
                </div>
            </div>
            <div className="font-mono text-lg font-bold text-primary tabular-nums">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
        </div>
    )
}

export function Header() {
  const pathname = usePathname();
  const isGameLevel = /^\/level-\d/.test(pathname);

  const renderNavLinks = (isSheet = false) => navLinks.map(link => (
    <NavLink
      key={link.href}
      href={link.href}
      label={link.label}
      isSheet={isSheet}
    />
  ));

  const GameWrapper = isGameLevel ? GameStateProvider: React.Fragment;
  const gameWrapperProps = isGameLevel ? {initialAssets: [], duration: 0, startingBalance: 0} : {};


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-6 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
             <Image src="/logo.svg" alt="Iqtisad Logo" width={32} height={32} className="dark:invert-0 invert" />
            <span className="hidden font-bold sm:inline-block font-headline text-lg">
              Iqtisad
            </span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
            {renderNavLinks()}
        </nav>
        
        <div className="ml-auto">
            {isGameLevel && (
              <GameWrapper {...gameWrapperProps}>
                <GameStateDisplay />
              </GameWrapper>
            )}
        </div>

        <div className="flex md:hidden ml-4">
           <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
               <div className="p-4">
                 <Link href="/" className="flex items-center space-x-2 mb-8">
                   <Image src="/logo.svg" alt="Iqtisad Logo" width={32} height={32} className="dark:invert-0 invert"/>
                   <span className="font-bold text-lg">Iqtisad</span>
                 </Link>
                <nav className="grid gap-6">
                  {renderNavLinks(true)}
                </nav>
               </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
