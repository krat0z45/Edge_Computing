'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Cloud, Milestone, Server, Siren, Waves, Thermometer, AlertTriangle } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';
import { RobotArmMockup } from './robot-arm-mockup';

type LogEntry = {
  message: string;
  type: 'info' | 'alert' | 'data' | 'summary' | 'action' | 'warning';
  timestamp: string;
};

type RobotStatus = 'normal' | 'warning' | 'error';

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
      return <Waves className="h-4 w-4 text-muted-foreground" />;
    default:
      return <Bot className="h-4 w-4 text-muted-foreground" />;
  }
};

export function EdgeSimulator() {
  const [deviceLogs, setDeviceLogs] = useState<LogEntry[]>([]);
  const [gatewayLogs, setGatewayLogs] = useState<LogEntry[]>([]);
  const [cloudLogs, setCloudLogs] = useState<LogEntry[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [robotStatus, setRobotStatus] = useState<RobotStatus>('normal');
  const [simulationData, setSimulationData] = useState({ vibration: 5, temp: 45, errors: 0 });

  const addLog = (
    setter: React.Dispatch<React.SetStateAction<LogEntry[]>>,
    message: string,
    type: LogEntry['type'] = 'info'
  ) => {
    const timestamp = new Date().toLocaleTimeString();
    setter((prev) => [{ message, type, timestamp }, ...prev].slice(0, 100));
  };

  const simulateDeviceEvent = (type: 'normal' | 'vibration' | 'error') => {
    setIsSimulating(true);
    let eventData: any;
    let localStatus: RobotStatus = 'normal';

    if (type === 'normal') {
      const vibration = Math.floor(Math.random() * 5) + 3; // 3-7 Hz
      const temp = Math.floor(Math.random() * 10) + 40; // 40-49°C
      eventData = { type: 'SENSOR_DATA', vibration, temp, errors: 0, timestamp: Date.now() };
      setSimulationData({ vibration, temp, errors: 0 });
      addLog(setDeviceLogs, `Datos normales: ${vibration} Hz, ${temp}°C`, 'data');
    } else if (type === 'vibration') {
      const vibration = Math.floor(Math.random() * 8) + 15; // 15-22 Hz
      const temp = Math.floor(Math.random() * 15) + 65; // 65-79°C
      eventData = { type: 'SENSOR_DATA', vibration, temp, errors: 0, timestamp: Date.now() };
      setSimulationData({ vibration, temp, errors: 0 });
      localStatus = 'warning';
      addLog(setDeviceLogs, `¡Anomalía detectada!: Vibración ${vibration} Hz, Temp ${temp}°C`, 'warning');
    } else { // error
      const errors = Math.floor(Math.random() * 3) + 1;
      eventData = { type: 'PRODUCTION_ERROR', errors, partId: `P-${Math.floor(Math.random()*1000)}`, timestamp: Date.now() };
      setSimulationData(prev => ({ ...prev, errors: prev.errors + errors}));
      localStatus = 'error';
      addLog(setDeviceLogs, `¡Fallo de ensamblaje! ${errors} error(es) en pieza.`, 'alert');
    }
    
    setRobotStatus(localStatus);
    
    setTimeout(() => {
      addLog(setGatewayLogs, `Recibiendo datos de sensores del brazo robótico...`);
      simulateGatewayProcessing(eventData, localStatus);
    }, 500);
    
    setTimeout(() => {
        setIsSimulating(false);
        // Reset status visually after a moment if not a persistent error
        if(localStatus !== 'error') setTimeout(()=> setRobotStatus('normal'), 1500)
    }, 1000);
  };

  const simulateGatewayProcessing = (data: any, status: RobotStatus) => {
    if (data.type === 'SENSOR_DATA') {
      addLog(setGatewayLogs, `Procesando: ${data.vibration} Hz, ${data.temp}°C.`, 'data');
      if (status === 'warning') {
        addLog(setGatewayLogs, `ADVERTENCIA: Vibración/Temperatura fuera de rango. Notificando a la nube y programando mantenimiento.`, 'warning');
        setTimeout(() => simulateCloudProcessing({type: 'MAINTENANCE_ALERT', reason: `High vibration (${data.vibration} Hz) and temp (${data.temp}°C)`}), 500);
      } else {
         addLog(setGatewayLogs, `Parámetros operativos normales.`, 'info');
      }
      // Send aggregated data to cloud periodically
      if(Math.random() > 0.5) {
        setTimeout(() => simulateCloudProcessing({type: 'HOURLY_SUMMARY', avgVibration: data.vibration, avgTemp: data.temp}), 1000);
      }
    } else if (data.type === 'PRODUCTION_ERROR') {
      addLog(setGatewayLogs, `ERROR CRÍTICO: ${data.errors} error(es) en pieza ${data.partId}. ¡Deteniendo línea de producción!`, 'action');
      setRobotStatus('error');
      // Immediate alert to cloud
      setTimeout(() => simulateCloudProcessing(data), 500);
    }
  };

  const simulateCloudProcessing = (data: any) => {
    if (data.type === 'MAINTENANCE_ALERT') {
      addLog(setCloudLogs, `Alerta de Mantenimiento: ${data.reason}. Orden de trabajo #W0-${Date.now()%1000} creada.`, 'warning');
    } else if (data.type === 'PRODUCTION_ERROR') {
      addLog(setCloudLogs, `ERROR DE PRODUCCIÓN: ${data.errors} error(es) en ${data.partId}. Registrado para análisis de causa raíz.`, 'alert');
    } else if (data.type === 'HOURLY_SUMMARY') {
      addLog(setCloudLogs, `Resumen de datos: Promedio de ${data.avgVibration.toFixed(1)} Hz y ${data.avgTemp.toFixed(1)}°C guardado.`, 'summary');
    }
  };

  const handleReset = () => {
    setDeviceLogs([]);
    setGatewayLogs([]);
    setCloudLogs([]);
    setIsSimulating(false);
    setRobotStatus('normal');
    setSimulationData({ vibration: 5, temp: 45, errors: 0 });
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
              <Button onClick={() => simulateDeviceEvent('normal')} disabled={isSimulating} variant="outline">
                <Waves className="mr-2 h-4 w-4" />
                Operación Normal
              </Button>
              <Button onClick={() => simulateDeviceEvent('vibration')} disabled={isSimulating} variant="secondary">
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
          <LogDisplay title="Dispositivos" logs={deviceLogs} icon={Bot} />
          <LogDisplay title="Nube" logs={cloudLogs} icon={Cloud} />
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
                     <RobotArmMockup status={robotStatus} data={simulationData} />
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
