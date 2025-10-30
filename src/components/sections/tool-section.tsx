import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { CodeBlock } from '@/components/code-block';

const simulatorLogicCode = `
'use client';

import { useState, useEffect, useRef } from 'react';

// ... (Tipos de datos omitidos para brevedad) ...

export function EdgeSimulatorLogic() {
  const [deviceLogs, setDeviceLogs] = useState([]);
  const [gatewayLogs, setGatewayLogs] = useState([]);
  const [cloudLogs, setCloudLogs] = useState([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [carStatus, setCarStatus] = useState('normal');
  const [simulationData, setSimulationData] = useState({ speed: 0, obstacle: false, failure: false });

  const addLog = (setLogs, message, type) => {
    const timestamp = new Date().toLocaleTimeString('es-ES');
    setLogs((prev) => [{ message, type, timestamp }, ...prev]);
  };

  const simulateProgressiveChange = (start, end, duration, stepCallback, finalCallback) => {
    const change = end - start;
    const steps = duration / 50;
    const increment = change / steps;
    let currentValue = start;
    let stepCount = 0;
    
    const simInterval = setInterval(() => {
      stepCount++;
      if (stepCount >= steps) {
        currentValue = end;
        clearInterval(simInterval);
        stepCallback(currentValue);
        finalCallback();
      } else {
        currentValue += increment;
        stepCallback(currentValue);
      }
    }, 50);
  };

  const simulateDeviceEvent = (type) => {
    if (isSimulating) return;
    setIsSimulating(true);

    if (type === 'obstacle') {
        addLog(setDeviceLogs, '¡Obstáculo detectado!', 'alert');
        setSimulationData(prev => ({...prev, obstacle: true}));
        
        setTimeout(() => {
             addLog(setGatewayLogs, 'Obstáculo confirmado. Iniciando frenado de emergencia.', 'action');
             setCarStatus('braking');
             simulateProgressiveChange(simulationData.speed, 0, 1500,
                (speed) => setSimulationData(prev => ({ ...prev, speed })),
                () => {
                    addLog(setGatewayLogs, 'Vehículo detenido.', 'info');
                    addLog(setCloudLogs, 'Incidente de Frenado de Emergencia registrado.', 'summary');
                    // ... Lógica para reanudar la marcha ...
                    setIsSimulating(false);
                }
             );
        }, 500); // Latencia simulada del gateway
    }
    
    if (type === 'failure') {
        addLog(setDeviceLogs, '¡Falla detectada en el sistema del acelerador!', 'alert');
        setSimulationData(prev => ({ ...prev, failure: true }));
        setCarStatus('failure');
        
        setTimeout(() => {
            addLog(setGatewayLogs, 'Anomalía Crítica: Aceleración no controlada.', 'warning');
            simulateProgressiveChange(simulationData.speed, 150, 1000, 
            (speed) => setSimulationData(prev => ({ ...prev, speed })),
            () => {
                addLog(setGatewayLogs, '¡PELIGRO INMINENTE! Anulando sistema de aceleración AHORA.', 'action');
                setCarStatus('braking');
                simulateProgressiveChange(160, 0, 2000,
                (speed) => setSimulationData(prev => ({ ...prev, speed })),
                () => {
                    addLog(setGatewayLogs, 'Falla contenida. El vehículo se ha detenido.', 'info');
                    addLog(setCloudLogs, 'Falla Crítica de Acelerador Registrada.', 'alert');
                    setIsSimulating(false);
                });
            });
        }, 200); // Latencia muy baja para una anulación crítica en el Edge
    }
  };

  // ... (El resto es la renderización del componente con JSX) ...
}
`.trim();

export function ToolSection() {
  return (
    <section id="tool" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl">Lógica del Simulador</CardTitle>
            <CardDescription>
              Este es un extracto del código que impulsa el simulador. Observa
              cómo los eventos se procesan con diferentes latencias simuladas,
              demostrando la ventaja del procesamiento en el borde (Edge).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CodeBlock>{simulatorLogicCode}</CodeBlock>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
