import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import Link from 'next/link';

function ArchitectureNodesAnimation() {
  const NODE_COUNT = 6;
  const nodes = Array.from({ length: NODE_COUNT }, (_, i) => {
    const sizeClass = `n${(i % NODE_COUNT) + 1}`;
    const style = {
      top: `${Math.random() * 90 + 5}%`,
      left: `${Math.random() * 90 + 5}%`,
      animationDelay: `${Math.random() * -10}s`,
      '--tx': `${Math.random() * 200 - 100}px`,
      '--ty': `${Math.random() * 200 - 100}px`,
    } as React.CSSProperties;
    return <div key={`node-${i}`} className={`node ${sizeClass}`} style={style} />;
  });

  return (
    <div className="architecture-nodes absolute top-0 left-0 w-full h-full -z-10">
      {/* This is a simplified visual representation.
          A true line connection would require SVG or Canvas. */}
      <div className="lines">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={`line-${i}`}
            className="line"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 150 + 100}px`,
              height: '1px',
              transform: `rotate(${Math.random() * 180}deg)`,
              animationDelay: `${Math.random() * -15}s`,
            }}
          />
        ))}
      </div>
      {nodes}
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center text-center bg-transparent overflow-hidden">
      <ArchitectureNodesAnimation />
      <div className="container mx-auto px-4 md:px-6 z-10">
        <div className="flex flex-col items-center space-y-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none text-white">
              Edge Computing Architecture
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
