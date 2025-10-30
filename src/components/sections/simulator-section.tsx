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
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl">
              Simulador Interactivo de Arquitectura Edge
            </CardTitle>
            <CardDescription>
              Ejecuta una simulación en tiempo real para observar cómo los
              datos fluyen y se procesan a través de los diferentes niveles:
              Dispositivo, Pasarela y Nube.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EdgeSimulator />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
