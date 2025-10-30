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
# An AWS IoT Greengrass component definition (recipe.yaml)
# This recipe defines a component that runs a Python script on an edge device.

RecipeFormatVersion: "2020-01-25"
ComponentName: "com.example.EdgeTemperatureMonitor"
ComponentVersion: "1.0.0"
ComponentDescription: "Monitors temperature and sends alerts from the edge."
ComponentPublisher: "MyOrganization"

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

# The corresponding Python script (temperature_monitor.py) would contain logic
# to read a sensor, process the data, and publish to an MQTT topic.
`.trim();

export function ToolSection() {
  return (
    <section id="tool" className="w-full py-12 md:py-24 lg:py-32 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl">
              Implementation Tool: AWS IoT Greengrass
            </CardTitle>
            <CardDescription>
              An explanation of how a tool like AWS IoT Greengrass can be used
              to implement and manage an Edge Computing architecture.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              AWS IoT Greengrass is a service that extends AWS services to edge
              devices. It allows you to build, deploy, and manage device
              software. You can run Lambda functions, Docker containers, or
              native processes on devices, which can act locally on the data
              they generate while still using the cloud for management,
              analytics, and durable storage.
            </p>
            <h4 className="font-semibold text-lg mb-2">
              Example: Component Recipe
            </h4>
            <p className="text-muted-foreground mb-4">
              Below is an example of a "recipe" file for a Greengrass
              component. This YAML file defines the component's dependencies and
              tells Greengrass how to install and run the application code on
              the edge device.
            </p>
            <CodeBlock>{toolCode}</CodeBlock>
            <div className="mt-6 flex justify-start">
              <Button asChild variant="outline">
                <Link
                  href="https://aws.amazon.com/greengrass/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn more about Greengrass
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
