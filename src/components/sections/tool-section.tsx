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

const ExplanationContent = () => (
  <div className="prose prose-invert max-w-none text-muted-foreground p-4">
    <h3 className="text-xl font-bold text-primary flex items-center gap-2">
      <span role="img" aria-label="car">
        🚗
      </span>{' '}
      Ejemplo Práctico: Edge Computing en un Coche Autónomo
    </h3>
    <h4 className="font-semibold text-foreground mt-4">Objetivo</h4>
    <p>
      Demostrar cómo la arquitectura de Edge Computing permite tomar decisiones
      críticas en tiempo real en un vehículo autónomo, minimizando la
      dependencia de la nube y reduciendo la latencia.
    </p>

    <h3 className="text-xl font-bold text-primary mt-6">Arquitectura por Capas</h3>
    <p>
      El sistema se organiza en tres capas fundamentales, siguiendo el patrón
      de Edge Computing:
    </p>
    <div className="space-y-4 mt-4">
      <div>
        <h4 className="font-semibold text-foreground">
          1. Capa de Dispositivos Edge (Sensores del Coche)
        </h4>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>Representada por la clase <code>CarSensors</code>.</li>
          <li>
            Simula sensores físicos del vehículo (como LiDAR, cámaras o sensores
            de fallo mecánico).
          </li>
          <li>
            Genera eventos en tiempo real:
            <ul className="list-['-_'] list-inside ml-4">
              <li>
                <code>obstacle_detected</code>: detecta un obstáculo cercano.
              </li>
              <li>
                <code>accelerator_failure</code>: detecta una falla crítica en
                el acelerador.
              </li>
            </ul>
          </li>
          <li>
            Característica clave: produce datos críticos que requieren respuesta
            inmediata.
          </li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold text-foreground">
          2. Capa de Gateway Edge (Computadora a Bordo)
        </h4>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>Representada por la clase <code>EdgeGateway</code>.</li>
          <li>Actúa como el "cerebro local" del vehículo.</li>
          <li>
            Procesa los datos localmente sin esperar a la nube:
            <ul className="list-['-_'] list-inside ml-4">
              <li>Si hay un obstáculo → activa el frenado de emergencia.</li>
              <li>
                Si hay falla en el acelerador → anula el sistema para evitar
                accidentes.
              </li>
            </ul>
          </li>
          <li>Solo después de actuar, envía un reporte a la nube.</li>
          <li>
            Ventaja: toma decisiones en milisegundos, esencial para la
            seguridad.
          </li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold text-foreground">3. Capa de Nube Central</h4>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>Representada por la clase <code>Cloud</code>.</li>
          <li>No participa en la toma de decisiones en tiempo real.</li>
          <li>
            Se encarga de:
            <ul className="list-['-_'] list-inside ml-4">
              <li>Registrar incidentes.</li>
              <li>Almacenar logs para análisis posterior.</li>
              <li>
                Generar alertas globales (ej.: notificar al fabricante sobre
                fallas recurrentes).
              </li>
            </ul>
          </li>
          <li>
            Latencia simulada: 0.5 segundos, para reflejar el retraso típico de
            una conexión a internet.
          </li>
        </ul>
      </div>
    </div>
    <h3 className="text-xl font-bold text-primary mt-6">
      ¿Por Qué Usar Edge Computing Aquí?
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
      <div className="border p-4 rounded-lg bg-card/50">
        <p className="font-bold">Obstáculo en la carretera (Sin Edge)</p>
        <p className="text-red-400">
          El coche envía datos a la nube → espera respuesta → frena (¡demasiado
          tarde!)
        </p>
      </div>
      <div className="border p-4 rounded-lg bg-card/50">
        <p className="font-bold">Obstáculo en la carretera (Con Edge)</p>
        <p className="text-green-400">
          El coche <strong className='text-green-300'>frena inmediatamente</strong> usando su computadora a bordo.
        </p>
      </div>
       <div className="border p-4 rounded-lg bg-card/50">
        <p className="font-bold">Falla crítica (Sin Edge)</p>
        <p className="text-red-400">
          Depende de la nube para desactivar sistemas → riesgo de accidente.
        </p>
      </div>
       <div className="border p-4 rounded-lg bg-card/50">
        <p className="font-bold">Falla crítica (Con Edge)</p>
        <p className="text-green-400">
          <strong className='text-green-300'>Anula el sistema localmente</strong> en milisegundos → evita peligro.
        </p>
      </div>
    </div>
    <p className='mt-4'><strong className="text-foreground">✅ Conclusión: Edge Computing es imprescindible en aplicaciones donde la latencia puede costar vidas.</strong></p>

    <h3 className="text-xl font-bold text-primary mt-6">Flujo de Ejecución (Simulación)</h3>
      <ul className="list-disc list-inside space-y-1 mt-2">
        <li>Los sensores detectan un obstáculo → generan evento.</li>
        <li>El gateway edge procesa el evento localmente y activa el frenado.</li>
        <li>Luego, informa a la nube del incidente.</li>
        <li>Separadamente, se simula una falla del acelerador → el gateway anula el sistema.</li>
        <li>La nube recibe un reporte crítico después de que la emergencia ya fue contenida.</li>
      </ul>
      <p className='mt-2'>⏱️ Tiempo de respuesta local: <strong>~0.02–0.05 segundos</strong></p>
      <p>⏳ Tiempo de comunicación con la nube: <strong>~0.5 segundos</strong> (demasiado lento para emergencias)</p>

     <h3 className="text-xl font-bold text-primary mt-6">Conclusión</h3>
      <p className='mt-2'>Este ejemplo ilustra uno de los casos de uso más poderosos del Edge Computing: sistemas autónomos de seguridad crítica. Al mover la inteligencia desde la nube hacia el "borde" (el propio vehículo), se logra:</p>
      <ul className="list-disc list-inside space-y-1 mt-2">
        <li>✅ Respuesta en tiempo real</li>
        <li>✅ Reducción de tráfico de red</li>
        <li>✅ Operación continua incluso con conexión intermitente</li>
        <li>✅ Mayor seguridad y confiabilidad</li>
      </ul>
      <p className='mt-2'>Este enfoque es clave en la industria automotriz, manufactura inteligente, salud remota y ciudades inteligentes.</p>
  </div>
);


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
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="react">JavaScript (React)</TabsTrigger>
                <TabsTrigger value="python">Python (Simulación)</TabsTrigger>
                <TabsTrigger value="explanation">Explicación</TabsTrigger>
              </TabsList>
              <TabsContent value="react">
                <CodeBlock>{reactLogicCode}</CodeBlock>
              </TabsContent>
              <TabsContent value="python">
                <CodeBlock>{pythonLogicCode}</CodeBlock>
              </TabsContent>
              <TabsContent value="explanation">
                <ExplanationContent />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
