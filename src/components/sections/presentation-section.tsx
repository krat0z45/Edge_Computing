import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { BrainCircuit, Cloud, Layers, Rocket, Map } from 'lucide-react';

const slides = [
  {
    icon: <BrainCircuit className="h-12 w-12 text-primary" />,
    title: 'What is Edge Computing?',
    content:
      "Edge computing is a distributed computing paradigm that brings computation and data storage closer to the sources of data. This is done to improve response times and save bandwidth. Instead of sending data to a centralized cloud for processing, it's processed locally, 'at the edge' of the network.",
  },
  {
    icon: <Layers className="h-12 w-12 text-primary" />,
    title: 'Architectural Tiers',
    content:
      'A typical edge architecture consists of multiple tiers: 1. **Device Edge**: IoT sensors and devices. 2. **Local Edge**: On-premise gateways or servers. 3. **Regional Edge**: Data centers closer to users than the central cloud. 4. **Cloud**: Centralized storage and large-scale analytics.',
  },
  {
    icon: <Cloud className="h-12 w-12 text-primary" />,
    title: 'Edge vs. Cloud',
    content:
      'Cloud computing relies on centralized data centers, ideal for massive data storage and complex, non-urgent processing. Edge computing decentralizes processing, which is essential for low-latency, real-time applications and reducing data transmission costs.',
  },
  {
    icon: <Rocket className="h-12 w-12 text-primary" />,
    title: 'Benefits of Edge',
    content:
      'Key advantages include: a) **Speed & Low Latency**: Faster response for real-time needs. b) **Improved Security**: Sensitive data stays local. c) **Cost Savings**: Reduced bandwidth and cloud processing costs. d) **Reliability**: Operates even with poor connectivity.',
  },
  {
    icon: <Map className="h-12 w-12 text-primary" />,
    title: 'Real-World Use Cases',
    content:
      'Edge computing is transforming industries: a) **Smart Manufacturing**: Real-time monitoring of factory equipment. b) **Autonomous Vehicles**: Instant decision-making on the road. c) **Healthcare**: On-site patient data analysis. d) **Retail**: In-store analytics and personalized experiences.',
  },
];

export function PresentationSection() {
  return (
    <section id="presentation" className="w-full py-12 md:py-24 lg:py-32 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            A Quick Introduction
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            A 10-minute overview of Edge Computing architecture concepts.
          </p>
        </div>
        <Carousel
          className="w-full max-w-4xl mx-auto"
          opts={{ loop: true }}
          aria-label="Presentation Slides"
        >
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card className="shadow-md">
                    <CardContent className="flex flex-col items-center justify-center p-8 md:p-12 space-y-4 min-h-[300px]">
                      {slide.icon}
                      <h3 className="text-2xl font-bold text-center text-primary">
                        {slide.title}
                      </h3>
                      <p className="text-muted-foreground text-center">
                        {slide.content}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
}
