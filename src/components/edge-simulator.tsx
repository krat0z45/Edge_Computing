'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Cloud, Milestone, Server, Siren, Car, AlertTriangle, Zap } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';
import { SmartCarMockup } from './smart-car-mockup';

type LogEntry = {
  message: string;
  type: 'info' | 'alert' | 'data' | 'summary' | 'action' | 'warning';
  timestamp: string;
};

type CarStatus = 'normal' | 'braking' | 'accelerating' | 'failure';

export function EdgeSimulator() {
  const [deviceLogs, setDeviceLogs] = useState<LogEntry[]>([]);
  const [gatewayLogs, setGatewayLogs] = useState<LogEntry[]>([]);
  const [cloudLogs, setCloudLogs] = useState<LogEntry[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [carStatus, setCarStatus] = useState<CarStatus>('normal');
  const [simulationData, setSimulationData] = useState({ speed: 80, obstacle: false, failure: false });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const addLog = (
    setter: React.Dispatch<React.SetStateAction<LogEntry[]>>,
    message: string,
    type: LogEntry['type'] = 'info'
  ) => {
    const timestamp = new Date().toLocaleTimeString();
    setter((prev) => [{ message, type, timestamp }, ...prev].slice(0, 100));
  };
  
  const manageSpeed = (targetSpeed: number, rate: number, onComplete?: () => void) => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setSimulationData(prev => {
        const currentSpeed = prev.speed;
        if (currentSpeed < targetSpeed) {
          const newSpeed = Math.min(currentSpeed + rate, targetSpeed);
          if (newSpeed === targetSpeed && onComplete) onComplete();
          return { ...prev, speed: newSpeed };
        } else if (currentSpeed > targetSpeed) {
          const newSpeed = Math.max(currentSpeed - rate, targetSpeed);
          if (newSpeed === targetSpeed && onComplete) onComplete();
          return { ...prev, speed: newSpeed };
        } else {
          if (intervalRef.current) clearInterval(intervalRef.current);
          if (onComplete) onComplete();
          return prev;
        }
      });
    }, 100);
  };

  const simulateDeviceEvent = (type: 'normal' | 'obstacle' | 'failure') => {
    if(isSimulating) return;
    setIsSimulating(true);

    if (type === 'normal') {
      setCarStatus('accelerating');
      addLog(setDeviceLogs, `Iniciando conducción normal.`, 'info');
      manageSpeed(80, 2, () => {
        addLog(setGatewayLogs, `Velocidad de crucero alcanzada: 80 km/h.`, 'data');
        setCarStatus('normal');
        setIsSimulating(false);
      });
    } else if (type === 'obstacle') {
        const distance = (Math.random() * 30 + 10).toFixed(1);
        addLog(setDeviceLogs, `¡Obstáculo detectado! Objeto a ${distance}m.`, 'alert');
        setSimulationData(prev => ({ ...prev, obstacle: true }));
        setCarStatus('braking');
        
        addLog(setGatewayLogs, `¡ACCIÓN INMEDIATA! Frenado de emergencia progresivo activado.`, 'action');
        manageSpeed(10, 5, () => {
            addLog(setGatewayLogs, `Vehículo detenido de forma segura.`, 'info');
            setTimeout(() => {
                addLog(setDeviceLogs, `Obstáculo despejado. Reanudando marcha.`, 'info');
                setSimulationData(prev => ({ ...prev, obstacle: false }));
                setCarStatus('accelerating');
                addLog(setGatewayLogs, `Acelerando progresivamente a velocidad de crucero.`, 'action');
                manageSpeed(80, 2, () => {
                  setCarStatus('normal');
                  setIsSimulating(false);
                  addLog(setCloudLogs, `Incidente de Obstáculo Registrado y Resuelto.`, 'summary');
                });
            }, 2000);
        });
    } else { // failure
        addLog(setDeviceLogs, `¡FALLA CRÍTICA! El acelerador no responde.`, 'alert');
        setSimulationData(prev => ({ ...prev, failure: true }));
        setCarStatus('failure');
        
        addLog(setGatewayLogs, `Anomalía detectada en el sistema de propulsión.`, 'warning');
        manageSpeed(140, 15, () => {
            addLog(setGatewayLogs, `¡PELIGRO INMINENTE! Desbordamiento de velocidad.`, 'alert');
            
            setTimeout(() => {
                addLog(setGatewayLogs, `Sistema de anulación de emergencia activado. Cortando aceleración.`, 'action');
                manageSpeed(0, 20, () => {
                    addLog(setGatewayLogs, `Falla contenida. El vehículo se ha detenido.`, 'info');
                    addLog(setCloudLogs, `Falla Crítica de Acelerador Registrada. Sistema de anulación fue exitoso.`, 'alert');
                    setCarStatus('normal');
                    setSimulationData(prev => ({ ...prev, failure: false }));
                    setIsSimulating(false);
                });
            }, 1000);
        });
    }
  };

  const handleReset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDeviceLogs([]);
    setGatewayLogs([]);
    setCloudLogs([]);
    setIsSimulating(false);
    setCarStatus('normal');
    setSimulationData({ speed: 80, obstacle: false, failure: false });
  };

  const LogIcon = ({ type }: { type: LogEntry['type'] }) => {
    switch (type) {
      case 'alert': return <Siren className="h-4 w-4 text-destructive" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'summary': return <Milestone className="h-4 w-4 text-blue-500" />;
      case 'action': return <Bot className="h-4 w-4 text-green-500" />;
      case 'data': return <Car className="h-4 w-4 text-muted-foreground" />;
      default: return <Bot className="h-4 w-4 text-muted-foreground" />;
    }
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
                      "text-destructive": log.type === 'alert', "text-yellow-500": log.type === 'warning',
                      "text-blue-500": log.type === 'summary', "text-green-600": log.type === 'action',
                    })}>{log.timestamp}</p>
                    <p className={cn({ "font-semibold": ['alert', 'action', 'warning'].includes(log.type) })}>{log.message}</p>
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
            <p className="text-sm text-muted-foreground text-center md:text-left">Genera eventos de sensores para ver cómo responde el sistema del coche autónomo.</p>
        </div>
        <div className="flex flex-col sm:flex-row lg:flex-col gap-2 w-full lg:col-span-2">
            <div className='flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2'>
              <Button onClick={() => simulateDeviceEvent('normal')} disabled={isSimulating}>
                <Car className="mr-2 h-4 w-4" />
                Conducción Normal
              </Button>
              <Button onClick={() => simulateDeviceEvent('obstacle')} disabled={isSimulating} variant="secondary">
                 <Siren className="mr-2 h-4 w-4" />
                Simular Obstáculo
              </Button>
               <Button onClick={() => simulateDeviceEvent('failure')} disabled={isSimulating} variant="destructive">
                 <Zap className="mr-2 h-4 w-4" />
                Falla del Acelerador
              </Button>
            </div>
             <Button onClick={handleReset} variant="ghost" className='w-full sm:w-auto'>
                Reiniciar Simulación
            </Button>
        </div>
      </div>
      
      <div className="flex flex-col-reverse lg:flex-row gap-4">
        <div className="flex flex-col md:flex-row lg:flex-col gap-4 w-full lg:w-1/3">
          <LogDisplay title="Sensores del Vehículo" logs={deviceLogs} icon={Bot} />
          <LogDisplay title="Nube Central" logs={cloudLogs} icon={Cloud} />
        </div>
        <div className="flex flex-col gap-4 w-full lg:w-2/3">
           <Card className="flex-1 min-w-0 bg-card/80">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <Server className="h-6 w-6 text-primary" />
                  <span>Computadora a Bordo (Gateway) y Maqueta</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col xl:flex-row gap-4">
                  <div className="w-full xl:w-1/2">
                     <SmartCarMockup status={carStatus} data={simulationData} />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <ScrollArea className="h-[340px] w-full pr-4">
                      {gatewayLogs.length === 0 ? (
                        <p className="text-sm text-muted-foreground italic">Esperando eventos...</p>
                      ) : (
                        <div className="space-y-3">
                          {gatewayLogs.map((log, index) => (
                            <div key={index} className="flex items-start gap-2 text-sm">
                              <LogIcon type={log.type}/>
                              <div className="flex-1">
                                <p className={cn("font-mono text-xs text-muted-foreground", {
                                  "text-destructive": log.type === 'alert', "text-yellow-500": log.type === 'warning',
                                  "text-blue-500": log.type === 'summary', "text-green-600": log.type === 'action',
                                })}>{log.timestamp}</p>
                                <p className={cn({ "font-semibold": ['alert', 'action', 'warning'].includes(log.type) })}>{log.message}</p>
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