import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

const edgeArchitecturePattern = [
  {
    factor: 'Conectores',
    description:
      'Protocolos de comunicación como MQTT, CoAP y HTTP/S que permiten el flujo de datos entre dispositivos, servidores de borde y la nube.',
  },
  {
    factor: 'Elementos de Datos',
    description:
      'Datos crudos de sensores, transmisiones de video, interacciones de usuario e información procesada que fluye a través de los niveles de la arquitectura.',
  },
  {
    factor: 'Configuración',
    description:
      'Una disposición por niveles de componentes: dispositivos de IoT/usuario, nodos de borde locales (gateways), servidores de borde regionales y la nube central.',
  },
  {
    factor: 'Restricciones',
    description:
      'Potencia computacional y almacenamiento limitados en dispositivos de borde; potencial de conectividad de red intermitente.',
  },
  {
    factor: 'Cualidades',
    description:
      'Baja latencia, consumo reducido de ancho de banda, mejora de la privacidad y seguridad de los datos, mayor fiabilidad y escalabilidad.',
  },
  {
    factor: 'Usos Típicos',
    description:
      'Vehículos autónomos, monitoreo industrial en tiempo real (IIoT), ciudades inteligentes, redes de entrega de contenido (CDNs) y experiencias de venta minorista interactivas.',
  },
  {
    factor: 'Precauciones',
    description:
      'Mayor complejidad en la implementación y gestión; desafíos para asegurar un gran número de dispositivos distribuidos y garantizar la consistencia de los datos.',
  },
];

export function FactorsSection() {
  return (
    <section id="factors" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl">
              Patrón Arquitectónico de Edge Computing
            </CardTitle>
            <CardDescription>
              Un análisis de los factores clave que definen la arquitectura de
              Edge Computing.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px]">Componente</TableHead>
                    <TableHead>Descripción</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {edgeArchitecturePattern.map((item) => (
                    <TableRow key={item.factor}>
                      <TableCell className="font-medium">
                        {item.factor}
                      </TableCell>
                      <TableCell>{item.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
