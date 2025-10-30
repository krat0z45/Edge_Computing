import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero-section';
import { FactorsSection } from '@/components/sections/factors-section';
import { PresentationSection } from '@/components/sections/presentation-section';
import { SimulatorSection } from '@/components/sections/simulator-section';
import { ToolSection } from '@/components/sections/tool-section';

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FactorsSection />
        <PresentationSection />
        <SimulatorSection />
        <ToolSection />
      </main>
      <Footer />
    </>
  );
}
