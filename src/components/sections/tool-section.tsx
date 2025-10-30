import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { CodeBlock } from '@/components/code-block';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

const toolCode = `
# Una definición de componente de AWS IoT Greengrass (recipe.yaml)
# Esta receta define un componente que ejecuta un script de Python en un dispositivo de borde.

RecipeFormatVersion: "2020-01-25"
ComponentName: "com.example.EdgeTemperatureMonitor"
ComponentVersion: "1.0.0"
ComponentDescription: "Monitorea la temperatura y envía alertas desde el borde."
ComponentPublisher: "MiOrganizacion"

ComponentDependencies:
  aws.greengrass.Nucleus:
    VersionRequirement: ">=2.5.0 <2.6.0"
  aws.greengrass.telemetry.NucleusEmitter:
    VersionRequirement: ">=2.1.0 <2.2.0"

Manifests:
  - Platform:
      os: linux
    Lifecycle:
      Install: "pip3 install awsiotsdk"
      Run: "python3 -u {artifacts:path}/temperature_monitor.py"

# El script de Python correspondiente (temperature_monitor.py) contendría la lógica
# para leer un sensor, procesar los datos y publicar en un tema MQTT.
`.trim();

export function ToolSection() {
  return (
    <section id="tool" className="w-full py-12 md:py-24 lg:py-32 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl">
              Herramienta de Implementación: AWS IoT Greengrass
            </CardTitle>
            <CardDescription>
              Una explicación de cómo una herramienta como AWS IoT Greengrass
              puede ser utilizada para implementar y gestionar una arquitectura
              de Edge Computing.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              AWS IoT Greengrass es un servicio que extiende los servicios de
              AWS a los dispositivos de borde. Te permite construir, desplegar
              y gestionar software de dispositivos. Puedes ejecutar funciones
              Lambda, contenedores Docker o procesos nativos en dispositivos,
              que pueden actuar localmente sobre los datos que generan mientras
              siguen utilizando la nube para la gestión, el análisis y el
              almacenamiento duradero.
            </p>
            <h4 className="font-semibold text-lg mb-2">
              Ejemplo: Receta de Componente
            </h4>
            <p className="text-muted-foreground mb-4">
              A continuación se muestra un ejemplo de un archivo de "receta"
              para un componente de Greengrass. Este archivo YAML define las
              dependencias del componente e indica a Greengrass cómo instalar y
              ejecutar el código de la aplicación en el dispositivo de borde.
            </p>
            <CodeBlock>{toolCode}</CodeBlock>
            <div className="mt-6 flex justify-start">
              <Button asChild variant="outline">
                <Link
                  href="https://aws.amazon.com/greengrass/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Aprender más sobre Greengrass
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
