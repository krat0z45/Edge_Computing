import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import Link from 'next/link';

function Sparkles() {
  const SPARKLE_COUNT = 50;
  return (
    <div className="sparkles absolute top-0 left-0 w-full h-full -z-10">
      {Array.from({ length: SPARKLE_COUNT }).map((_, i) => {
        const style = {
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 2}s`,
          animationDuration: `${Math.random() * 6 + 4}s`,
        };
        const sizeClass = `s${Math.ceil(Math.random() * 4)}`;
        return <div key={i} className={`sparkle ${sizeClass}`} style={style} />;
      })}
    </div>
  );
}


export function HeroSection() {
  return (
    <section className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center text-center bg-transparent overflow-hidden">
      <Sparkles />
      <div className="container mx-auto px-4 md:px-6 z-10">
        <div className="flex flex-col items-center space-y-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none text-white">
              Arquitectura de Edge Computing
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
              Explorando los patrones, factores y herramientas que definen los
              sistemas de computación modernos y descentralizados.
            </p>
          </div>
          <div className="space-x-4">
            <Link href="#factors">
              <Button size="lg" variant="secondary">
                Explorar Factores <ArrowDown className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
