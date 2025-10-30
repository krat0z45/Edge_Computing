import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { EdgeSimulator } from '@/components/edge-simulator';

export function SimulatorSection() {
  return (
    <section id="simulator" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="shadow-lg bg-transparent border-none">
          <CardHeader className="px-0">
            <CardTitle className="text-3xl">
              Simulador: Coche Autónomo
            </CardTitle>
            <CardDescription>
              Observa cómo la arquitectura Edge permite a un coche inteligente tomar decisiones en tiempo real. Genera eventos de sensores para ver cómo los datos se procesan en el borde para una conducción segura.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <EdgeSimulator />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

    