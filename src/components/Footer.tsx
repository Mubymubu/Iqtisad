import React from 'react';

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto py-6 px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Iqtisad. All rights reserved. For educational purposes only.
          </p>
          <p className="text-sm text-muted-foreground">
            A Behavioural Economics Simulation
          </p>
        </div>
      </div>
    </footer>
  );
}
