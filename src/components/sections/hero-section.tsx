import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export function HeroSection() {
  return (
    <section className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center text-center text-white">
      <Image
        src="https://img.freepik.com/premium-photo/edge-computing-image_1084438-18478.jpg"
        alt="Edge Computing"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative container mx-auto px-4 md:px-6">
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
