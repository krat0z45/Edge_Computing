import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const slides = [
  {
    image: PlaceHolderImages.find((img) => img.id === 'presentation-what-is-edge'),
    title: '¿Qué es Edge Computing?',
    content:
      'Es un modelo de computación distribuida que acerca el procesamiento y almacenamiento de datos al lugar donde se generan y se necesitan. En lugar de enviar todo a una nube central, las tareas críticas se manejan localmente, "en el borde" de la red, para respuestas más rápidas y eficientes.',
  },
  {
    image: PlaceHolderImages.find((img) => img.id === 'presentation-layers'),
    title: 'Niveles Arquitectónicos',
    content:
      'La arquitectura de borde se organiza en capas: 1. **Borde del Dispositivo**: Sensores y actuadores que capturan datos. 2. **Borde Local**: Pasarelas (gateways) que procesan datos de múltiples dispositivos. 3. **Borde Regional**: Centros de datos más cercanos al usuario que la nube. 4. **Nube Central**: Para análisis a gran escala y almacenamiento a largo plazo.',
  },
  {
    image: PlaceHolderImages.find((img) => img.id === 'presentation-edge-vs-cloud'),
    title: 'Edge vs. Nube',
    content:
      'La Nube es ideal para procesar grandes volúmenes de datos que no son urgentes. El Borde es crucial para aplicaciones que necesitan respuestas en tiempo real (baja latencia), operar con conexión intermitente y reducir los costos de transmisión de datos a la nube.',
  },
  {
    image: PlaceHolderImages.find((img) => img.id === 'presentation-benefits'),
    title: 'Beneficios del Borde',
    content:
      'Las ventajas clave incluyen: a) **Velocidad y Baja Latencia**: Respuestas casi instantáneas. b) **Seguridad y Privacidad**: Los datos sensibles se procesan localmente. c) **Ahorro de Ancho de Banda**: Se envían menos datos a la nube. d) **Fiabilidad**: Las aplicaciones funcionan incluso sin conexión a internet.',
  },
  {
    image: PlaceHolderImages.find((img) => img.id === 'presentation-use-cases'),
    title: 'Casos de Uso en el Mundo Real',
    content:
      'El Edge Computing impulsa la innovación en: a) **Vehículos Autónomos**: Procesan datos de sensores para tomar decisiones en milisegundos. b) **Ciudades Inteligentes**: Gestionan el tráfico y la seguridad en tiempo real. c) **Industria 4.0**: Optimizan la producción con análisis predictivo en la fábrica.',
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
            Un resumen de los conceptos clave de la arquitectura de Edge
            Computing.
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
                  <Card className="shadow-md overflow-hidden">
                    <CardContent className="flex flex-col md:flex-row items-center justify-center p-0 min-h-[450px]">
                      <div className="relative w-full h-48 md:h-full md:w-1/2">
                        {slide.image && (
                          <Image
                            src={slide.image.imageUrl}
                            alt={slide.title}
                            fill
                            className="object-cover"
                            data-ai-hint={slide.image.imageHint}
                          />
                        )}
                      </div>
                      <div className="flex flex-col space-y-4 p-8 md:p-12 md:w-1/2">
                        <h3 className="text-2xl font-bold text-primary">
                          {slide.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {slide.content}
                        </p>
                      </div>
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
