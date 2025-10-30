import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { CodeBlock } from '@/components/code-block';

const simulatorCode = `
// 1. Edge Device (e.g., a security camera)
class EdgeDevice {
  processFrame(frame) {
    // Perform object detection locally on the device
    const objects = this.detectObjects(frame);
    
    // If a person is detected, send high-priority alert to gateway
    if (objects.includes('person')) {
      const alert = { type: 'PERSON_DETECTED', timestamp: Date.now() };
      this.sendToGateway(alert, { priority: 'high' });
    }
  }
}

// 2. Edge Gateway (e.g., local server in the building)
class EdgeGateway {
  constructor() {
    this.deviceDataBuffer = [];
  }

  receiveData(data) {
    if (data.priority === 'high') {
      // Immediately forward critical alerts to the cloud
      this.sendToCloud(data);
    } else {
      // Buffer non-critical data
      this.deviceDataBuffer.push(data);
    }
  }
  
  // Periodically, aggregate and send batched data
  processAndForwardBatch() {
    if (this.deviceDataBuffer.length > 0) {
      const summary = this.aggregate(this.deviceDataBuffer);
      this.sendToCloud({ type: 'HOURLY_SUMMARY', payload: summary });
      this.deviceDataBuffer = []; // Clear buffer
    }
  }
}

// 3. Cloud Backend
class CloudService {
  handleData(data) {
    if (data.type === 'PERSON_DETECTED') {
      // Trigger security notifications, store event
      this.triggerSecurityAlert(data);
    } else if (data.type === 'HOURLY_SUMMARY') {
      // Store aggregated data for long-term analytics
      this.storeForAnalytics(data.payload);
    }
  }
}
`.trim();

export function SimulatorSection() {
  return (
    <section id="simulator" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl">
              Architectural Pattern Simulator
            </CardTitle>
            <CardDescription>
              A simulated code example illustrating the "Tiered Edge Network"
              pattern, where processing is distributed across devices, gateways,
              and the cloud.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              This simulation demonstrates how different tiers handle data. The
              Edge Device performs initial filtering, the Gateway aggregates
              data and forwards critical alerts, and the Cloud handles long-term
              storage and complex actions.
            </p>
            <CodeBlock>{simulatorCode}</CodeBlock>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
