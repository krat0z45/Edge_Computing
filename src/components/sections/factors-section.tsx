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

const etlPattern = [
  {
    factor: 'Connectors',
    description: 'Read, Write, Data-flow.',
  },
  {
    factor: 'Data Elements',
    description: 'Data flowing in the pipeline.',
  },
  {
    factor: 'Configuration',
    description: 'Components are arranged as a chain.',
  },
  {
    factor: 'Constraints',
    description:
      'The Read, Write, Data-flow relationship should not be circular. Data flows from left to right in the chain.',
  },
  {
    factor: 'Qualities',
    description:
      'Promotes modifiability. Promotes reuse. Promotes separation of concerns.',
  },
  {
    factor: 'Typical Uses',
    description: 'Business intelligence applications.',
  },
  {
    factor: 'Cautions',
    description:
      'A big challenge during data extraction is how your ETL tool handles structured and unstructured data.',
  },
];

export function FactorsSection() {
  return (
    <section id="factors" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl">
              ETL Architectural Pattern
            </CardTitle>
            <CardDescription>
              An analysis of the ETL (Extract, Transform, Load) architectural
              pattern.
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
                  {etlPattern.map((item) => (
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
