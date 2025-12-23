"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import React from 'react';
import Image from 'next/image';

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/tutorial", label: "Tutorial" },
  { href: "/core-concepts", label: "Core Concepts" },
  { href: "/level-1", label: "Level I" },
  { href: "/level-2", label: "Level II" },
  { href: "/level-3", label: "Level III" },
  { href: "/strategies", label: "Strategies" },
  { href: "/contact", label: "Contact" },
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

export function Header() {
  const renderNavLinks = (isSheet = false) => navLinks.map(link => (
    <NavLink
      key={link.href}
      href={link.href}
      label={link.label}
      isSheet={isSheet}
    />
  ));

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-auto flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
             <Image src="/logo.svg" alt="Iqtisad Logo" width={32} height={32} />
            <span className="hidden font-bold sm:inline-block font-headline text-lg">
              Iqtisad
            </span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
            {renderNavLinks()}
        </nav>
        
        <div className="flex md:hidden">
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
                   <Image src="/logo.svg" alt="Iqtisad Logo" width={32} height={32} />
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
