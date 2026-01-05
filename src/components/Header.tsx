
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import React from 'react';
import Image from 'next/image';
import { useGameStoreState } from '@/hooks/use-game-state';
import { useAudio } from '@/hooks/use-audio';

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/how-to-play", label: "How To Play" },
  { href: "/iqtisad-times", label: "The Iqtisad Chronicles" },
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
  const { playButtonSound } = useAudio();

  const linkClasses = cn(
    "text-sm font-medium transition-colors hover:text-primary",
    isActive ? "text-primary" : "text-muted-foreground"
  );
  
  const sheetLinkClasses = cn(
    "text-lg font-medium transition-colors hover:text-primary",
    isActive ? "text-primary" : "text-foreground"
  );

  const handleMouseEnter = () => {
    try {
      playButtonSound();
    } catch (error) {
      console.warn('Navigation sound failed:', error);
    }
  };
  
  if (isSheet) {
    return (
      <SheetClose asChild>
        <Link href={href} className={sheetLinkClasses} onMouseEnter={handleMouseEnter}>
          {label}
        </Link>
      </SheetClose>
    );
  }

  return (
    <Link href={href} className={linkClasses} onMouseEnter={handleMouseEnter}>
      {label}
    </Link>
  );
};

const GameStateDisplay = () => {
    const state = useGameStoreState();

    if (!state || state.phase === 'intro' || state.phase === 'debrief' || !state.phase) return null;

    const minutes = Math.floor(state.timeRemaining / 60);
    const seconds = state.timeRemaining % 60;

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
                   <div className="font-semibold">{formatCurrency(state.cashBalance)}</div>
                </div>
            </div>
             <div className="flex items-center gap-2">
                <div className="text-right">
                   <div className="text-muted-foreground text-xs">Portfolio Value</div>
                   <div className="font-semibold">{formatCurrency(state.portfolioValue)}</div>
                </div>
            </div>
            <div className="font-mono text-lg font-bold text-primary tabular-nums">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
        </div>
    )
}

function HeaderContent() {
    const pathname = usePathname();
    const isGameLevel = /^\/level-\d/.test(pathname) || pathname === '/tutorial';

    return isGameLevel ? <GameStateDisplay /> : null;
}

export function Header() {
  const pathname = usePathname();
  const isGameLevel = /^\/level-\d/.test(pathname) || pathname === '/tutorial';
  const { playButtonSound } = useAudio();

  const handleLogoHover = () => {
    try {
      playButtonSound();
    } catch (error) {
      console.warn('Logo sound failed:', error);
    }
  };

  const renderNavLinks = (isSheet = false) => navLinks.map(link => (
    <NavLink
      key={link.href}
      href={link.href}
      label={link.label}
      isSheet={isSheet}
    />
  ));

  const logoAltText = "Iqtisad Logo: A gold hexagon with six upward-trending candlesticks, symbolizing growth and structured learning in finance.";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-6 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2" onMouseEnter={handleLogoHover}>
            <Image
  src="/logo.svg"
  alt={logoAltText}
  width={80}
  height={80}
  className="h-16 w-auto object-contain"
  priority
/>

            {/* <span className="hidden font-bold sm:inline-block font-headline text-lg text-[#d2aa68]">
              Iqtisad
            </span> */}
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
            {renderNavLinks()}
        </nav>
        
        <div className="ml-auto">
            <HeaderContent/>
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
               <SheetHeader>
                 <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
               </SheetHeader>
               <div className="p-4">
                 <Link href="/" className="flex items-center space-x-2 mb-8" onMouseEnter={handleLogoHover}>
                   <Image src="/logo.svg" alt={logoAltText} width={28} height={28} />
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
