import { Cpu } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Cpu className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-foreground">
            Edge Computing Architecture
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link
            href="#factors"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Factores
          </Link>
          <Link
            href="#presentation"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Presentación
          </Link>
          <Link
            href="#simulator"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Simulador
          </Link>
          <Link
            href="#tool"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Herramienta
          </Link>
        </nav>
      </div>
    </header>
  );
}
