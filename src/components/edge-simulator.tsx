'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Thermometer, Siren, Server, Cloud, Bot, Milestone } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';
import { HouseMockup } from './house-mockup';

type LogEntry = {
  message: string;
  type: 'info' | 'alert' | 'data' | 'summary' | 'action';
  timestamp: string;
};

const LogIcon = ({ type }: { type: LogEntry['type'] }) => {
  switch (type) {
    case 'alert':
      return <Bot className="h-4 w-4 text-destructive" />;
    case 'summary':
      return <Milestone className="h-4 w-4 text-blue-500" />;
    case 'action':
      return <Bot className="h-4 w-4 text-green-500" />;
    case 'data':
      return <Thermometer className="h-4 w-4 text-muted-foreground" />;
    default:
      return <Siren className="h-4 w-4 text-muted-foreground" />;
  }
};

export function EdgeSimulator() {
  const [deviceLogs, setDeviceLogs] = useState<LogEntry[]>([]);
  const [gatewayLogs, setGatewayLogs] = useState<LogEntry[]>([]);
  const [cloudLogs, setCloudLogs] = useState<LogEntry[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isACOn, setIsACOn] = useState(false);
  const [motionDetected, setMotionDetected] = useState(false);
  const [currentTemp, setCurrentTemp] = useState(22);

  const addLog = (
    setter: React.Dispatch<React.SetStateAction<LogEntry[]>>,
    message: string,
    type: LogEntry['type'] = 'info'
  ) => {
    const timestamp = new Date().toLocaleTimeString();
    setter((prev) => [{ message, type, timestamp }, ...prev].slice(0, 100));
  };

  const simulateDeviceEvent = (type: 'temperature' | 'motion') => {
    setIsSimulating(true);
    let eventData;

    if (type === 'temperature') {
      const temp = Math.floor(Math.random() * 15) + 18; // Temp between 18°C and 32°C
      setCurrentTemp(temp);
      eventData = { type: 'SENSOR_TEMPERATURA', temperature: temp, timestamp: Date.now() };
      addLog(setDeviceLogs, `Nueva lectura: ${temp}°C.`, 'data');
    } else {
      eventData = { type: 'SENSOR_MOVIMIENTO', location: 'Living Room', timestamp: Date.now() };
      addLog(setDeviceLogs, '¡Movimiento detectado en el Living!', 'alert');
      setMotionDetected(true);
      setTimeout(() => setMotionDetected(false), 2000); // Motion alert lasts 2 seconds
    }
    
    setTimeout(() => {
      addLog(setGatewayLogs, `Recibiendo datos de ${type === 'temperature' ? 'sensor de temperatura' : 'sensor de movimiento'}...`);
      simulateGatewayProcessing(eventData);
    }, 500);
    
    setTimeout(() => setIsSimulating(false), 1000);
  };

  const simulateGatewayProcessing = (data: any) => {
    if (data.type === 'SENSOR_TEMPERATURA') {
      addLog(setGatewayLogs, `Procesando temperatura: ${data.temperature}°C.`, 'data');
      if (data.temperature > 28 && !isACOn) {
        addLog(setGatewayLogs, `Temperatura alta (${data.temperature}°C). ¡Encendiendo aire acondicionado!`, 'action');
        setIsACOn(true);
      } else if (data.temperature <= 24 && isACOn) {
        addLog(setGatewayLogs, `Temperatura agradable (${data.temperature}°C). Apagando aire acondicionado.`, 'action');
        setIsACOn(false);
      }
      // Send to cloud for historical analysis
      setTimeout(() => simulateCloudProcessing({type: 'REGISTRO_TEMPERATURA', ...data}), 500);

    } else if (data.type === 'SENSOR_MOVIMIENTO') {
      addLog(setGatewayLogs, `Alerta de movimiento en ${data.location}. Reenviando a la nube...`, 'alert');
      // Simulate immediate cloud send for security alerts
      setTimeout(() => simulateCloudProcessing(data), 500);
    }
  };

  const simulateCloudProcessing = (data: any) => {
    if (data.type === 'SENSOR_MOVIMIENTO') {
      addLog(setCloudLogs, `ALERTA DE SEGURIDAD: Movimiento detectado en ${data.location}. Enviando notificación al usuario.`, 'alert');
    } else if (data.type === 'REGISTRO_TEMPERATURA') {
      addLog(setCloudLogs, `Registro histórico: Temperatura de ${data.temperature}°C guardada para análisis de patrones.`, 'summary');
    }
  };

  const handleReset = () => {
    setDeviceLogs([]);
    setGatewayLogs([]);
    setCloudLogs([]);
    setIsSimulating(false);
    setIsACOn(false);
    setMotionDetected(false);
    setCurrentTemp(22);
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
                      "text-blue-500": log.type === 'summary',
                      "text-green-600": log.type === 'action',
                    })}>{log.timestamp}</p>
                    <p className={cn({ "font-semibold": log.type === 'alert' || log.type === 'action' })}>{log.message}</p>
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
            <p className="text-sm text-muted-foreground text-center md:text-left">Genera eventos de sensores para ver cómo responde la casa inteligente.</p>
        </div>
        <div className="flex flex-col sm:flex-row lg:flex-col gap-2 w-full lg:col-span-2">
            <div className='flex-1 grid grid-cols-2 gap-2'>
              <Button onClick={() => simulateDeviceEvent('temperature')} disabled={isSimulating} variant="outline">
                <Thermometer className="mr-2 h-4 w-4" />
                Simular Temperatura
              </Button>
              <Button onClick={() => simulateDeviceEvent('motion')} disabled={isSimulating} variant="destructive">
                 <Siren className="mr-2 h-4 w-4" />
                Simular Movimiento
              </Button>
               <Button onClick={handleReset} variant="secondary">
                Reiniciar
              </Button>
            </div>
        </div>
      </div>
      
      <div className="flex flex-col-reverse lg:flex-row gap-4">
        <div className="flex flex-col md:flex-row lg:flex-col gap-4 w-full lg:w-1/3">
          <LogDisplay title="Dispositivos" logs={deviceLogs} icon={Thermometer} />
          <LogDisplay title="Nube" logs={cloudLogs} icon={Cloud} />
        </div>
        <div className="flex flex-col gap-4 w-full lg:w-2/3">
           <Card className="flex-1 min-w-0 bg-card/80">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <Server className="h-6 w-6 text-primary" />
                  <span>Pasarela (Hub Local) y Maqueta</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col xl:flex-row gap-4">
                  <div className="w-full xl:w-1/2">
                     <HouseMockup isACOn={isACOn} motionDetected={motionDetected} />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <ScrollArea className="h-64 w-full pr-4">
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
                                  "text-blue-500": log.type === 'summary',
                                  "text-green-600": log.type === 'action',
                                })}>{log.timestamp}</p>
                                <p className={cn({ "font-semibold": log.type === 'alert' || log.type === 'action' })}>{log.message}</p>
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
