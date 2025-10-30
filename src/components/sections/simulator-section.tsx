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
              Simulador Interactivo: Casa Inteligente
            </CardTitle>
            <CardDescription>
              Observa cómo una arquitectura Edge gestiona eventos en una casa inteligente. Genera eventos de sensores y mira cómo los datos fluyen y se procesan a través de los diferentes niveles.
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
