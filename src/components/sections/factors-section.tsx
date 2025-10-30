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
import { Wifi, Zap, ShieldCheck, Database, Expand, Bot } from 'lucide-react';

const factors = [
  {
    icon: <Zap className="h-5 w-5 text-accent" />,
    factor: 'Latency',
    description: 'The time delay in data communication over a network.',
    impact:
      'Edge computing significantly reduces latency by processing data closer to the source, enabling real-time applications.',
    example: 'Autonomous vehicles requiring millisecond-level decisions.',
  },
  {
    icon: <Wifi className="h-5 w-5 text-accent" />,
    factor: 'Bandwidth',
    description: 'The maximum rate of data transfer across a given path.',
    impact:
      'By pre-processing data locally, edge devices reduce the amount of data sent to the cloud, conserving network bandwidth.',
    example:
      'Video surveillance systems analyzing footage on-site and only sending alerts.',
  },
  {
    icon: <ShieldCheck className="h-5 w-5 text-accent" />,
    factor: 'Security',
    description: 'Protection of data from unauthorized access or corruption.',
    impact:
      'Data processed at the edge is less exposed to public networks, reducing attack surfaces. However, physical device security becomes critical.',
    example: "Encrypting sensitive patient data on a hospital's local edge server.",
  },
  {
    icon: <Database className="h-5 w-5 text-accent" />,
    factor: 'Data Privacy',
    description: 'Handling of sensitive data in compliance with regulations.',
    impact:
      'Keeps sensitive or personal data within local jurisdiction, helping to comply with laws like GDPR.',
    example: 'Processing user data within a specific country or region.',
  },
  {
    icon: <Expand className="h-5 w-5 text-accent" />,
    factor: 'Scalability',
    description: "The system's ability to handle a growing amount of work.",
    impact:
      'Edge architectures can scale horizontally by adding more edge nodes, distributing the load without overwhelming a central server.',
    example: 'A smart city adding new IoT sensors without performance degradation.',
  },
  {
    icon: <Bot className="h-5 w-5 text-accent" />,
    factor: 'Autonomy',
    description:
      'The ability of a system to operate without constant connectivity.',
    impact:
      'Edge devices can operate reliably even with intermittent or no cloud connection, ensuring continuous operation.',
    example:
      'A remote industrial site that continues to function during a network outage.',
  },
];

export function FactorsSection() {
  return (
    <section id="factors" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl">Key Architectural Factors</CardTitle>
            <CardDescription>
              An analysis of crucial factors in Edge Computing architecture,
              similar to an ETL process evaluation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px]">Factor</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Impact on Edge</TableHead>
                    <TableHead>Example</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {factors.map((item) => (
                    <TableRow key={item.factor}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          {item.icon}
                          {item.factor}
                        </div>
                      </TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{item.impact}</TableCell>
                      <TableCell>{item.example}</TableCell>
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
