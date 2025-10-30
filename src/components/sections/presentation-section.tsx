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
    title: '¿Qué es Edge Computing?',
    content:
      'Edge computing es un paradigma de computación distribuida que acerca el cómputo y el almacenamiento de datos a las fuentes de datos. Esto se hace para mejorar los tiempos de respuesta y ahorrar ancho de banda. En lugar de enviar datos a una nube centralizada para su procesamiento, se procesan localmente, "en el borde" de la red.',
  },
  {
    icon: <Layers className="h-12 w-12 text-primary" />,
    title: 'Niveles Arquitectónicos',
    content:
      'Una arquitectura de borde típica consta de múltiples niveles: 1. **Borde del Dispositivo**: Sensores y dispositivos de IoT. 2. **Borde Local**: Pasarelas o servidores locales. 3. **Borde Regional**: Centros de datos más cercanos a los usuarios que la nube central. 4. **Nube**: Almacenamiento centralizado y análisis a gran escala.',
  },
  {
    icon: <Cloud className="h-12 w-12 text-primary" />,
    title: 'Edge vs. Nube',
    content:
      'La computación en la nube se basa en centros de datos centralizados, ideal para almacenamiento masivo de datos y procesamiento complejo no urgente. La computación de borde descentraliza el procesamiento, lo cual es esencial para aplicaciones de baja latencia en tiempo real y para reducir los costos de transmisión de datos.',
  },
  {
    icon: <Rocket className="h-12 w-12 text-primary" />,
    title: 'Beneficios del Borde',
    content:
      'Las ventajas clave incluyen: a) **Velocidad y Baja Latencia**: Respuesta más rápida para necesidades en tiempo real. b) **Seguridad Mejorada**: Los datos sensibles permanecen locales. c) **Ahorro de Costos**: Reducción de ancho de banda y costos de procesamiento en la nube. d) **Fiabilidad**: Funciona incluso con conectividad deficiente.',
  },
  {
    icon: <Map className="h-12 w-12 text-primary" />,
    title: 'Casos de Uso en el Mundo Real',
    content:
      'Edge computing está transformando industrias: a) **Manufactura Inteligente**: Monitoreo en tiempo real de equipos de fábrica. b) **Vehículos Autónomos**: Toma de decisiones instantánea en la carretera. c) **Salud**: Análisis de datos de pacientes en el sitio. d) **Venta Minorista**: Analíticas en tienda y experiencias personalizadas.',
  },
];

export function PresentationSection() {
  return (
    <section
      id="presentation"
      className="w-full py-12 md:py-24 lg:py-32 bg-card"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Una Rápida Introducción
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Un resumen de 10 minutos sobre los conceptos de la arquitectura de
            Edge Computing.
          </p>
        </div>
        <Carousel
          className="w-full max-w-4xl mx-auto"
          opts={{ loop: true }}
          aria-label="Diapositivas de la Presentación"
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
