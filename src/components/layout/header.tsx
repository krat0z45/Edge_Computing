import { Cpu } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Cpu className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-foreground">
            Edge Architect
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link
            href="#factors"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Factors
          </Link>
          <Link
            href="#presentation"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Presentation
          </Link>
          <Link
            href="#simulator"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Simulator
          </Link>
          <Link
            href="#tool"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Tool
          </Link>
        </nav>
      </div>
    </header>
  );
}
