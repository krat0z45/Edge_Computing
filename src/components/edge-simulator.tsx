'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Cloud, Milestone, Server, Siren, Waves, AlertTriangle, Package } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';
import { ConveyorBeltMockup } from './conveyor-belt-mockup';

type LogEntry = {
  message: string;
  type: 'info' | 'alert' | 'data' | 'summary' | 'action' | 'warning';
  timestamp: string;
};

type ConveyorStatus = 'normal' | 'warning' | 'error';

const LogIcon = ({ type }: { type: LogEntry['type'] }) => {
  switch (type) {
    case 'alert':
      return <Siren className="h-4 w-4 text-destructive" />;
    case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    case 'summary':
      return <Milestone className="h-4 w-4 text-blue-500" />;
    case 'action':
      return <Bot className="h-4 w-4 text-green-500" />;
    case 'data':
      return <Package className="h-4 w-4 text-muted-foreground" />;
    default:
      return <Bot className="h-4 w-4 text-muted-foreground" />;
  }
};

export function EdgeSimulator() {
  const [deviceLogs, setDeviceLogs] = useState<LogEntry[]>([]);
  const [gatewayLogs, setGatewayLogs] = useState<LogEntry[]>([]);
  const [cloudLogs, setCloudLogs] = useState<LogEntry[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [conveyorStatus, setConveyorStatus] = useState<ConveyorStatus>('normal');
  const [simulationData, setSimulationData] = useState({ speed: 1.2, weight: 15, errors: 0 });

  const addLog = (
    setter: React.Dispatch<React.SetStateAction<LogEntry[]>>,
    message: string,
    type: LogEntry['type'] = 'info'
  ) => {
    const timestamp = new Date().toLocaleTimeString();
    setter((prev) => [{ message, type, timestamp }, ...prev].slice(0, 100));
  };

  const simulateDeviceEvent = (type: 'normal' | 'anomaly' | 'error') => {
    setIsSimulating(true);
    let eventData: any;
    let localStatus: ConveyorStatus = 'normal';

    if (type === 'normal') {
      const speed = parseFloat((Math.random() * 0.2 + 1.1).toFixed(2)); // 1.1 - 1.3 m/s
      const weight = Math.floor(Math.random() * 5) + 12; // 12-16 kg
      eventData = { type: 'BELT_DATA', speed, weight, timestamp: Date.now() };
      setSimulationData(prev => ({ ...prev, speed, weight }));
      addLog(setDeviceLogs, `Datos normales: Velocidad ${speed} m/s, Peso ${weight} kg`, 'data');
    } else if (type === 'anomaly') {
      const speed = parseFloat((Math.random() * 0.5 + 1.5).toFixed(2)); // 1.5 - 2.0 m/s
      eventData = { type: 'BELT_DATA', speed, weight: simulationData.weight, timestamp: Date.now() };
      setSimulationData(prev => ({...prev, speed }));
      localStatus = 'warning';
      addLog(setDeviceLogs, `¡Anomalía detectada!: Velocidad irregular de ${speed} m/s`, 'warning');
    } else { // error
      const packageId = `PKG-${Math.floor(Math.random()*1000)}`;
      eventData = { type: 'OBSTRUCTION_ERROR', error: 'Paquete caído', packageId, timestamp: Date.now() };
      setSimulationData(prev => ({ ...prev, errors: prev.errors + 1}));
      localStatus = 'error';
      addLog(setDeviceLogs, `¡Fallo del sistema! Paquete ${packageId} obstruyendo la línea.`, 'alert');
    }
    
    setConveyorStatus(localStatus);
    
    setTimeout(() => {
      addLog(setGatewayLogs, `Recibiendo datos de la banda transportadora...`);
      simulateGatewayProcessing(eventData, localStatus);
    }, 500);
    
    // Duration of simulation effect
    const simulationDuration = type === 'error' ? 3000 : 1500;
    setTimeout(() => {
        setIsSimulating(false);
        if(localStatus !== 'error') {
            setTimeout(()=> setConveyorStatus('normal'), 1000);
        }
    }, simulationDuration);
  };

  const simulateGatewayProcessing = (data: any, status: ConveyorStatus) => {
    if (data.type === 'BELT_DATA') {
      addLog(setGatewayLogs, `Procesando: ${data.speed} m/s.`, 'data');
      if (status === 'warning') {
        addLog(setGatewayLogs, `ADVERTENCIA: Velocidad fuera de rango. Ajustando motor y notificando a la nube.`, 'warning');
        setTimeout(() => simulateCloudProcessing({type: 'PERFORMANCE_ALERT', reason: `High speed detected (${data.speed} m/s)`}), 500);
      } else {
         addLog(setGatewayLogs, `Parámetros operativos normales.`, 'info');
      }
      if(Math.random() > 0.7) {
        setTimeout(() => simulateCloudProcessing({type: 'HOURLY_SUMMARY', avgSpeed: data.speed, packages: Math.floor(Math.random()*100)+500}), 1000);
      }
    } else if (data.type === 'OBSTRUCTION_ERROR') {
      addLog(setGatewayLogs, `ERROR CRÍTICO: ${data.error}. ¡Deteniendo banda transportadora inmediatamente!`, 'action');
      setConveyorStatus('error');
      setTimeout(() => simulateCloudProcessing(data), 500);
    }
  };

  const simulateCloudProcessing = (data: any) => {
    if (data.type === 'PERFORMANCE_ALERT') {
      addLog(setCloudLogs, `Alerta de Rendimiento: ${data.reason}. Registrado para análisis de eficiencia.`, 'warning');
    } else if (data.type === 'OBSTRUCTION_ERROR') {
      addLog(setCloudLogs, `ERROR DE LÍNEA: ${data.error} con paquete ${data.packageId}. Orden de mantenimiento de emergencia #W1-${Date.now()%1000} creada.`, 'alert');
    } else if (data.type === 'HOURLY_SUMMARY') {
      addLog(setCloudLogs, `Resumen de Operaciones: ${data.packages} paquetes procesados a una velocidad promedio de ${data.avgSpeed.toFixed(1)} m/s.`, 'summary');
    }
  };

  const handleReset = () => {
    setDeviceLogs([]);
    setGatewayLogs([]);
    setCloudLogs([]);
    setIsSimulating(false);
    setConveyorStatus('normal');
    setSimulationData({ speed: 1.2, weight: 15, errors: 0 });
  };

  const LogDisplay = ({ title, logs, icon: Icon }: { title: string, logs: LogEntry[], icon: React.ElementType }) => (
    <Card className="flex-1 min-w-0 bg-card/80">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
          <Icon className="h-6 w-6 text-primary" />
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-64 w-full pr-4">
          {logs.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">Esperando eventos...</p>
          ) : (
            <div className="space-y-3">
              {logs.map((log, index) => (
                <div key={index} className="flex items-start gap-2 text-sm">
                  <LogIcon type={log.type}/>
                  <div className="flex-1">
                    <p className={cn("font-mono text-xs text-muted-foreground", {
                      "text-destructive": log.type === 'alert',
                      "text-yellow-500": log.type === 'warning',
                      "text-blue-500": log.type === 'summary',
                      "text-green-600": log.type === 'action',
                    })}>{log.timestamp}</p>
                    <p className={cn({ "font-semibold": log.type === 'alert' || log.type === 'action' || log.type === 'warning' })}>{log.message}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center p-4 border rounded-lg bg-card/80">
        <div className='lg:col-span-2 space-y-2'>
           <h4 className="font-semibold text-center md:text-left">Controles de Simulación</h4>
            <p className="text-sm text-muted-foreground text-center md:text-left">Genera eventos de sensores para ver cómo responde el sistema de mantenimiento predictivo.</p>
        </div>
        <div className="flex flex-col sm:flex-row lg:flex-col gap-2 w-full lg:col-span-2">
            <div className='flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2'>
              <Button onClick={() => simulateDeviceEvent('normal')} disabled={isSimulating}>
                <Waves className="mr-2 h-4 w-4" />
                Operación Normal
              </Button>
              <Button onClick={() => simulateDeviceEvent('anomaly')} disabled={isSimulating} variant="secondary">
                 <AlertTriangle className="mr-2 h-4 w-4" />
                Simular Anomalía
              </Button>
               <Button onClick={() => simulateDeviceEvent('error')} disabled={isSimulating} variant="destructive">
                 <Siren className="mr-2 h-4 w-4" />
                Simular Fallo
              </Button>
            </div>
             <Button onClick={handleReset} variant="ghost" className='w-full sm:w-auto'>
                Reiniciar Simulación
            </Button>
        </div>
      </div>
      
      <div className="flex flex-col-reverse lg:flex-row gap-4">
        <div className="flex flex-col md:flex-row lg:flex-col gap-4 w-full lg:w-1/3">
          <LogDisplay title="Sensores del Borde" logs={deviceLogs} icon={Bot} />
          <LogDisplay title="Nube Central" logs={cloudLogs} icon={Cloud} />
        </div>
        <div className="flex flex-col gap-4 w-full lg:w-2/3">
           <Card className="flex-1 min-w-0 bg-card/80">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <Server className="h-6 w-6 text-primary" />
                  <span>Pasarela (Gateway) y Maqueta</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col xl:flex-row gap-4">
                  <div className="w-full xl:w-1/2">
                     <ConveyorBeltMockup status={conveyorStatus} data={simulationData} />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <ScrollArea className="h-[280px] w-full pr-4">
                      {gatewayLogs.length === 0 ? (
                        <p className="text-sm text-muted-foreground italic">Esperando eventos...</p>
                      ) : (
                        <div className="space-y-3">
                          {gatewayLogs.map((log, index) => (
                            <div key={index} className="flex items-start gap-2 text-sm">
                              <LogIcon type={log.type}/>
                              <div className="flex-1">
                                <p className={cn("font-mono text-xs text-muted-foreground", {
                                  "text-destructive": log.type === 'alert',
                                   "text-yellow-500": log.type === 'warning',
                                  "text-blue-500": log.type === 'summary',
                                  "text-green-600": log.type === 'action',
                                })}>{log.timestamp}</p>
                                <p className={cn({ "font-semibold": log.type === 'alert' || log.type === 'action' || log.type === 'warning' })}>{log.message}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </ScrollArea>
                  </div>
                </div>
              </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}

    