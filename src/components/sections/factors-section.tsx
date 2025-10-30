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
    factor: 'Connectors',
    description:
      'Communication protocols like MQTT, CoAP, and HTTP/S that enable data flow between devices, edge servers, and the cloud.',
  },
  {
    factor: 'Data Elements',
    description:
      'Raw data from sensors, video feeds, user interactions, and processed information that flows through the tiers of the architecture.',
  },
  {
    factor: 'Configuration',
    description:
      'A tiered arrangement of components: IoT/user devices, local edge nodes (gateways), regional edge servers, and the central cloud.',
  },
  {
    factor: 'Constraints',
    description:
      'Limited computational power and storage on edge devices; potential for intermittent network connectivity.',
  },
  {
    factor: 'Qualities',
    description:
      'Low latency, reduced bandwidth consumption, improved data privacy and security, increased reliability, and scalability.',
  },
  {
    factor: 'Typical Uses',
    description:
      'Autonomous vehicles, real-time industrial monitoring (IIoT), smart cities, content delivery networks (CDNs), and interactive retail experiences.',
  },
  {
    factor: 'Cautions',
    description:
      'Increased complexity in deployment and management; challenges in securing a large number of distributed devices and ensuring data consistency.',
  },
];

export function FactorsSection() {
  return (
    <section id="factors" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl">
              Edge Computing Architectural Pattern
            </CardTitle>
            <CardDescription>
              An analysis of the key factors defining the Edge Computing
              architecture.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px]">Component</TableHead>
                    <TableHead>Description</TableHead>
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
