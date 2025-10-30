'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Cloud, Milestone, Server, Siren, Car, AlertTriangle, Snowflake, Sun } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';
import { SmartCarMockup } from './smart-car-mockup';

type LogEntry = {
  message: string;
  type: 'info' | 'alert' | 'data' | 'summary' | 'action' | 'warning';
  timestamp: string;
};

type CarStatus = 'normal' | 'alert' | 'weather_alert';

export function EdgeSimulator() {
  const [deviceLogs, setDeviceLogs] = useState<LogEntry[]>([]);
  const [gatewayLogs, setGatewayLogs] = useState<LogEntry[]>([]);
  const [cloudLogs, setCloudLogs] = useState<LogEntry[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [carStatus, setCarStatus] = useState<CarStatus>('normal');
  const [simulationData, setSimulationData] = useState({ speed: 80, obstacle: false, weather: 'clear' });

  const addLog = (
    setter: React.Dispatch<React.SetStateAction<LogEntry[]>>,
    message: string,
    type: LogEntry['type'] = 'info'
  ) => {
    const timestamp = new Date().toLocaleTimeString();
    setter((prev) => [{ message, type, timestamp }, ...prev].slice(0, 100));
  };

  const simulateDeviceEvent = (type: 'normal' | 'obstacle' | 'weather') => {
    setIsSimulating(true);
    let eventData: any;
    let localStatus: CarStatus = 'normal';

    if (type === 'normal') {
        const speed = Math.floor(Math.random() * 20) + 70; // 70-90 km/h
        eventData = { type: 'DRIVING_DATA', speed, timestamp: Date.now() };
        setSimulationData({ speed, obstacle: false, weather: 'clear' });
        addLog(setDeviceLogs, `Datos de conducción: Velocidad ${speed} km/h`, 'data');
    } else if (type === 'obstacle') {
        const distance = (Math.random() * 30 + 10).toFixed(1); // 10-40 meters
        eventData = { type: 'OBSTACLE_AHEAD', distance, timestamp: Date.now() };
        setSimulationData(prev => ({ ...prev, obstacle: true }));
        localStatus = 'alert';
        addLog(setDeviceLogs, `¡Obstáculo detectado! Objeto a ${distance}m.`, 'alert');
    } else { // weather
        eventData = { type: 'WEATHER_CHANGE', condition: 'Lluvia Intensa', timestamp: Date.now() };
        setSimulationData(prev => ({ ...prev, weather: 'rain' }));
        localStatus = 'weather_alert';
        addLog(setDeviceLogs, `Sensor de clima: ${eventData.condition}.`, 'warning');
    }
    
    setCarStatus(localStatus);
    
    setTimeout(() => {
      addLog(setGatewayLogs, `Recibiendo datos de los sensores del vehículo...`);
      simulateGatewayProcessing(eventData, localStatus);
    }, 500);
    
    const simulationDuration = 3000;
    setTimeout(() => {
        setIsSimulating(false);
        setSimulationData(prev => ({ ...prev, obstacle: false, weather: 'clear' }));
        setCarStatus('normal');
    }, simulationDuration);
  };

  const simulateGatewayProcessing = (data: any, status: CarStatus) => {
    if (data.type === 'DRIVING_DATA') {
      addLog(setGatewayLogs, `Procesando: Velocidad ${data.speed} km/h. Ruta estable.`, 'data');
       if(Math.random() > 0.8) {
        addLog(setGatewayLogs, `Optimizando consumo de batería.`, 'info');
        setTimeout(() => simulateCloudProcessing({type: 'EFFICIENCY_LOG', message: 'Ajuste menor de energía realizado.'}), 1000);
      }
    } else if (data.type === 'OBSTACLE_AHEAD') {
      addLog(setGatewayLogs, `¡ACCIÓN INMEDIATA! Frenado de emergencia activado. Obstáculo a ${data.distance}m.`, 'action');
      setTimeout(() => simulateCloudProcessing({ ...data, reason: 'Frenado automático por seguridad.' }), 500);
    } else if (data.type === 'WEATHER_CHANGE') {
      addLog(setGatewayLogs, `ADVERTENCIA DE CLIMA: ${data.condition}. Reduciendo velocidad y activando limpiaparabrisas.`, 'warning');
      setSimulationData(prev => ({...prev, speed: 60}));
      setTimeout(() => simulateCloudProcessing({ ...data, action: 'Velocidad reducida a 60 km/h por seguridad.'}), 500);
    }
  };

  const simulateCloudProcessing = (data: any) => {
    if (data.type === 'OBSTACLE_AHEAD') {
      addLog(setCloudLogs, `Incidente Crítico Registrado: ${data.reason} Vehículo evitó colisión.`, 'alert');
    } else if (data.type === 'WEATHER_CHANGE') {
      addLog(setCloudLogs, `Alerta de Flota: ${data.condition} reportada en la zona. Notificando a otros vehículos.`, 'warning');
    } else if (data.type === 'EFFICIENCY_LOG') {
      addLog(setCloudLogs, `Registro de telemetría: ${data.message} Almacenando para análisis de rendimiento.`, 'summary');
    }
  };

  const handleReset = () => {
    setDeviceLogs([]);
    setGatewayLogs([]);
    setCloudLogs([]);
    setIsSimulating(false);
    setCarStatus('normal');
    setSimulationData({ speed: 80, obstacle: false, weather: 'clear' });
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
              <Button onClick={() => simulateDeviceEvent('obstacle')} disabled={isSimulating} variant="destructive">
                 <Siren className="mr-2 h-4 w-4" />
                Simular Obstáculo
              </Button>
               <Button onClick={() => simulateDeviceEvent('weather')} disabled={isSimulating} variant="secondary">
                 <Snowflake className="mr-2 h-4 w-4" />
                Simular Mal Clima
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

    