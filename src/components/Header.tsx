"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DollarSign, Menu } from 'lucide-react';
import { useProgress } from '@/context/ProgressProvider';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import React from 'react';

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/tutorial", label: "Tutorial" },
  { href: "/core-concepts", label: "Core Concepts" },
  { href: "/level-1", label: "Level I", needsTutorial: true },
  { href: "/level-2", label: "Level II", needsTutorial: true },
  { href: "/level-3", label: "Level III", needsTutorial: true },
  { href: "/strategies", label: "Strategies" },
  { href: "/contact", label: "Contact Us" },
];

const NavLink = ({ href, label, disabled, isSheet = false }: { href: string; label: string; disabled: boolean; isSheet?: boolean }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  const Comp = disabled ? 'span' : Link;

  const sheetClasses = "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground";
  const desktopClasses = cn(
    "transition-colors hover:text-foreground",
    isActive ? "text-foreground font-semibold" : "text-muted-foreground"
  );
  
  if (disabled) {
      return (
          <span className={cn(isSheet ? sheetClasses : desktopClasses, "cursor-not-allowed opacity-50")}>
              {label}
          </span>
      )
  }

  if (isSheet) {
    return (
      <SheetClose asChild>
        <Link href={href} className={cn(sheetClasses, isActive && 'text-foreground')}>
          {label}
        </Link>
      </SheetClose>
    );
  }

  return (
    <Link
      href={href}
      className={desktopClasses}
    >
      {label}
    </Link>
  );
};

export function Header() {
  const { tutorialCompleted } = useProgress();

  const renderNavLinks = (isSheet = false) => navLinks.map(link => (
    <NavLink
      key={link.href}
      href={link.href}
      label={link.label}
      disabled={!!link.needsTutorial && !tutorialCompleted}
      isSheet={isSheet}
    />
  ));

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <DollarSign className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block font-headline">
              Iqtisad
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {renderNavLinks()}
          </nav>
        </div>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:hidden">
           <Link href="/" className="flex items-center space-x-2">
             <DollarSign className="h-6 w-6 text-primary" />
             <span className="font-bold font-headline">Iqtisad</span>
           </Link>
           <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
               <Link href="/" className="flex items-center space-x-2 mb-8">
                 <DollarSign className="h-6 w-6 text-primary" />
                 <span className="font-bold font-headline">Iqtisad</span>
               </Link>
              <nav className="grid gap-6 text-lg font-medium">
                {renderNavLinks(true)}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}