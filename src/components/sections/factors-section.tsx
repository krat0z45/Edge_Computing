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
    description: [
      'Cómputo, Red, Sensores/Actuadores, Sincronización con la Nube.',
      'Interconexiones entre dispositivos edge, gateways, redes locales y servicios en la nube.',
    ],
  },
  {
    factor: 'Elementos de Datos',
    description: [
      'Flujos de datos en tiempo real, resultados procesados localmente, metadatos, señales de control.',
      'Datos generados y tratados cerca de la fuente, con flujo selectivo hacia la nube o actuadores.',
    ],
  },
  {
    factor: 'Configuración',
    description: [
      'Nodos descentralizados organizados en jerarquía o malla.',
      'Los nodos edge están distribuidos físicamente, con procesamiento local y sincronización ocasional con la nube.',
    ],
  },
  {
    factor: 'Restricciones',
    description: [
      'Las operaciones sensibles a la latencia deben ejecutarse localmente.',
      'Los enlaces con ancho de banda limitado restringen el envío masivo a la nube.',
      'No deben existir dependencias circulares entre edge y nube en rutas críticas.',
    ],
    isList: true,
  },
  {
    factor: 'Cualidades',
    description: [
      'Reduce la latencia y el uso de ancho de banda.',
      'Mejora la respuesta en tiempo real.',
      'Aumenta la tolerancia a fallos y autonomía.',
      'Refuerza la privacidad al mantener datos sensibles en el borde.',
    ],
    isList: true,
  },
  {
    factor: 'Usos Típicos',
    description: [
      'Aplicaciones IoT, vehículos autónomos, fábricas inteligentes, realidad aumentada/virtual, análisis de video, monitoreo médico remoto.',
    ],
  },
  {
    factor: 'Precauciones',
    description: [
      'Gestionar hardware y sistemas operativos heterogéneos en los nodos edge es complejo.',
      'La seguridad en el borde es más difícil de implementar que en la nube centralizada.',
      'La orquestación y actualización de nodos requiere prácticas DevOps robustas.',
    ],
    isList: true,
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
                    <TableHead className="w-[200px]">Factor</TableHead>
                    <TableHead>Descripción</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {edgeArchitecturePattern.map((item) => (
                    <TableRow key={item.factor}>
                      <TableCell className="font-medium">
                        {item.factor}
                      </TableCell>
                      <TableCell>
                        {item.isList ? (
                          <ul className="list-disc list-inside space-y-1">
                            {item.description.map((point, index) => (
                              <li key={index}>{point}</li>
                            ))}
                          </ul>
                        ) : (
                          <p>{item.description.join(' ')}</p>
                        )}
                      </TableCell>
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
