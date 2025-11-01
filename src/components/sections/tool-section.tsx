import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { CodeBlock } from '@/components/code-block';

const reactLogicCode = `
'use client';

import { useState, useEffect } from 'react';

// ... (Componentes y tipos omitidos para brevedad) ...

export function EdgeSimulator() {
  const [deviceLogs, setDeviceLogs] = useState([]);
  const [gatewayLogs, setGatewayLogs] = useState([]);
  const [cloudLogs, setCloudLogs] = useState([]);
  // ... (Otros estados) ...

  const addLog = (setLogs, message, type) => {
    // ... (Añade una entrada al log con timestamp) ...
  };

  const simulateDeviceEvent = (type) => {
    if (isSimulating) return;
    setIsSimulating(true);

    if (type === 'obstacle') {
        // 1. SENSOR (EDGE) GENERA EL DATO
        addLog(setDeviceLogs, '¡Obstáculo detectado!', 'alert');
        
        // Simula la latencia de la red local (muy baja)
        setTimeout(() => {
             // 2. GATEWAY (EDGE) PROCESA Y ACTÚA
             addLog(setGatewayLogs, 'Obstáculo confirmado. Iniciando frenado de emergencia.', 'action');
             setCarStatus('braking');
             // ... (Lógica de simulación de frenado) ...

             // 3. GATEWAY (EDGE) ENVÍA REPORTE A LA NUBE (DESPUÉS DE ACTUAR)
             addLog(setCloudLogs, 'Incidente de Frenado de Emergencia registrado.', 'summary');
             
             setIsSimulating(false);
        }, 500); // Latencia simulada del gateway: 500ms
    }
    
    if (type === 'failure') {
        // 1. SENSOR (EDGE) DETECTA UNA FALLA CRÍTICA
        addLog(setDeviceLogs, '¡Falla detectada en el sistema del acelerador!', 'alert');
        setCarStatus('failure');
        
        // Latencia aún más baja para decisiones críticas
        setTimeout(() => {
            // 2. GATEWAY (EDGE) ANULA EL SISTEMA LOCALMENTE
            addLog(setGatewayLogs, '¡PELIGRO INMINENTE! Anulando sistema de aceleración AHORA.', 'action');
            // ... (Lógica de anulación y frenado) ...

            // 3. GATEWAY (EDGE) REPORTA LA FALLA A LA NUBE
            addLog(setCloudLogs, 'Falla Crítica de Acelerador Registrada.', 'alert');
            setIsSimulating(false);
        }, 200); // Latencia crítica del Edge: 200ms
    }
  };

  // ... (El resto es la renderización del componente con JSX) ...
}
`.trim();

const pythonLogicCode = `
import time

# --- Capa 1: Dispositivo Edge (Sensores del Coche) ---
class CarSensors:
    def detect_obstacle(self):
        print("[SENSOR]: ¡Obstáculo detectado!")
        return {"event": "obstacle_detected", "distance": 10}

    def detect_system_failure(self):
        print("[SENSOR]: ¡Falla crítica en el acelerador!")
        return {"event": "accelerator_failure"}

# --- Capa 2: Gateway Edge (Computadora a Bordo) ---
class EdgeGateway:
    def __init__(self, cloud):
        self.cloud = cloud

    def process_data(self, data):
        print(f"[GATEWAY]: Dato recibido: {data['event']}")
        
        if data["event"] == "obstacle_detected":
            # Decisión en tiempo real con baja latencia
            print("[GATEWAY]: ¡ACCIÓN! Frenado de emergencia activado.")
            time.sleep(0.05)  # Simula el tiempo de procesamiento local
            print("[GATEWAY]: Vehículo detenido.")
            # Después de actuar, envía un reporte a la nube
            self.cloud.log_incident("Incidente de frenado por obstáculo.")
            
        elif data["event"] == "accelerator_failure":
            # Decisión crítica para anular el sistema
            print("[GATEWAY]: ¡ACCIÓN CRÍTICA! Anulando sistema del acelerador.")
            time.sleep(0.02)  # Procesamiento ultra rápido
            print("[GATEWAY]: Sistema anulado. Falla contenida.")
            # Reporta el evento crítico a la nube
            self.cloud.log_critical_failure("Falla de acelerador contenida por el gateway.")

# --- Capa 3: Nube Central ---
class Cloud:
    def log_incident(self, message):
        # Simula la latencia de la red hacia la nube
        time.sleep(0.5) 
        print(f"[NUBE]: Reporte recibido y almacenado - '{message}'")

    def log_critical_failure(self, message):
        time.sleep(0.5)
        print(f"[NUBE]: ALERTA GLOBAL - '{message}'")

# --- Simulación ---
def run_simulation():
    # Inicialización del sistema
    cloud_server = Cloud()
    car_computer = EdgeGateway(cloud_server)
    car_sensors = CarSensors()

    print("--- Simulación de Coche Autónomo con Edge Computing ---")
    
    # Evento 1: Obstáculo en el camino
    print("\\n--- Evento: Obstáculo detectado ---")
    obstacle_data = car_sensors.detect_obstacle()
    car_computer.process_data(obstacle_data)
    
    print("\\n--- Evento: Falla Crítica del Sistema ---")
    failure_data = car_sensors.detect_system_failure()
    car_computer.process_data(failure_data)

if __name__ == "__main__":
    run_simulation()
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
            <Tabs defaultValue="react">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="react">JavaScript (React)</TabsTrigger>
                <TabsTrigger value="python">Python (Simulación)</TabsTrigger>
              </TabsList>
              <TabsContent value="react">
                <CodeBlock>{reactLogicCode}</CodeBlock>
              </TabsContent>
              <TabsContent value="python">
                <CodeBlock>{pythonLogicCode}</CodeBlock>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
