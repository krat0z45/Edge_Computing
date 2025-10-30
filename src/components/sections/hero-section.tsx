import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="w-full py-20 md:py-32 lg:py-40 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none text-primary">
              Edge Computing Architecture
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Exploring the patterns, factors, and tools that define modern,
              decentralized computing systems.
            </p>
          </div>
          <div className="space-x-4">
            <Link href="#factors">
              <Button size="lg">
                Explore Factors <ArrowDown className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
