import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

function NeuralNetworkAnimation() {
  const BOKEH_COUNT = 20;

  const bokehDots = Array.from({ length: BOKEH_COUNT }, (_, i) => {
    const size = Math.random() * 30 + 10;
    const style: React.CSSProperties = {
      width: `${size}px`,
      height: `${size}px`,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      backgroundColor: `hsla(${Math.random() * 60 + 180}, 70%, 60%, 0.5)`,
      animationDelay: `${Math.random() * -20}s`,
      '--tx': `${Math.random() * 200 - 100}px`,
      '--ty': `${Math.random() * 200 - 100}px`,
    };
    return <div key={`bokeh-${i}`} className="bokeh-dot" style={style} />;
  });

  const particlePaths = [
    'path-1',
    'path-2',
    'path-3',
    'path-4',
    'path-5',
    'path-6',
    'path-7',
    'path-8',
  ];

  return (
    <div className="neural-network-animation absolute top-0 left-0 w-full h-full -z-10 bg-gradient-to-br from-cyan-900/30 via-transparent to-indigo-900/30">
      {bokehDots}
      <svg
        viewBox="0 0 400 200"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <path
            id="path-1"
            className="nn-path"
            d="M 50 100 C 80 50, 120 50, 150 100"
          />
          <path
            id="path-2"
            className="nn-path"
            d="M 50 100 C 80 150, 120 150, 150 100"
          />
          <path
            id="path-3"
            className="nn-path"
            d="M 150 100 C 180 70, 220 70, 250 100"
          />
          <path
            id="path-4"
            className="nn-path"
            d="M 150 100 C 180 130, 220 130, 250 100"
          />
          <path
            id="path-5"
            className="nn-path"
            d="M 80 40 C 150 10, 200 10, 280 50"
          />
          <path
            id="path-6"
            className="nn-path"
            d="M 80 160 C 150 190, 200 190, 280 150"
          />
          <path
            id="path-7"
            className="nn-path"
            d="M 250 100 C 280 20, 320 50, 350 80"
          />
          <path
            id="path-8"
            className="nn-path"
            d="M 250 100 C 280 180, 320 150, 350 120"
          />
        </defs>

        {/* Render paths for particles to follow */}
        <use href="#path-1" />
        <use href="#path-2" />
        <use href="#path-3" />
        <use href="#path-4" />
        <use href="#path-5" />
        <use href="#path-6" />
        <use href="#path-7" />
        <use href="#path-8" />

        {/* Main Nodes */}
        <circle cx="50" cy="100" r="8" className="nn-node" />
        <circle cx="150" cy="100" r="10" className="nn-node" />
        <circle cx="250" cy="100" r="10" className="nn-node" />
        <circle cx="350" cy="80" r="6" className="nn-node" />
        <circle cx="350" cy="120" r="6" className="nn-node" />
        <circle cx="80" cy="40" r="7" className="nn-node" />
        <circle cx="80" cy="160" r="7" className="nn-node" />
        <circle cx="280" cy="50" r="5" className="nn-node" />
        <circle cx="280" cy="150" r="5" className="nn-node" />
        
        {/* Highlighted Nodes */}
        <g>
          <circle cx="150" cy="100" r="10" className="nn-node-highlight red" />
          <circle cx="150" cy="100" r="5" className="nn-node-core" />
        </g>
         <g>
          <circle cx="280" cy="50" r="5" className="nn-node-highlight yellow" />
          <circle cx="280" cy="50" r="2.5" className="nn-node-core" />
        </g>
         <g>
          <circle cx="80" cy="160" r="7" className="nn-node-highlight red" />
          <circle cx="80" cy="160" r="3.5" className="nn-node-core" />
        </g>

      </svg>
      
      {/* Particles */}
      {particlePaths.map((pathId, i) => (
        <div
          key={i}
          className="nn-particle"
          style={{
            offsetPath: `path(getComputedStyle(document.getElementById('${pathId}')).getPropertyValue('d'))`,
            animationDelay: `${i * 1}s`,
          }}
        />
      ))}

    </div>
  );
}


export function HeroSection() {
  return (
    <section className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center text-center bg-transparent overflow-hidden">
      <NeuralNetworkAnimation />
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
