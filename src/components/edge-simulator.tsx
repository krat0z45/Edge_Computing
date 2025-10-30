'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Server, Cloud, Bot, Milestone } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';

type LogEntry = {
  message: string;
  type: 'info' | 'alert' | 'data' | 'summary';
  timestamp: string;
};

const LogIcon = ({ type }: { type: LogEntry['type'] }) => {
  switch (type) {
    case 'alert':
      return <Bot className="h-4 w-4 text-destructive" />;
    case 'summary':
      return <Milestone className="h-4 w-4 text-blue-500" />;
    default:
      return <Camera className="h-4 w-4 text-muted-foreground" />;
  }
};

export function EdgeSimulator() {
  const [deviceLogs, setDeviceLogs] = useState<LogEntry[]>([]);
  const [gatewayLogs, setGatewayLogs] = useState<LogEntry[]>([]);
  const [cloudLogs, setCloudLogs] = useState<LogEntry[]>([]);
  const [gatewayBuffer, setGatewayBuffer] = useState<any[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);

  const addLog = (
    setter: React.Dispatch<React.SetStateAction<LogEntry[]>>,
    message: string,
    type: LogEntry['type'] = 'info'
  ) => {
    const timestamp = new Date().toLocaleTimeString();
    setter((prev) => [{ message, type, timestamp }, ...prev]);
  };

  const simulateDeviceProcessing = (isPerson: boolean) => {
    const frameData = {
      type: isPerson ? 'PERSONA_DETECTADA' : 'FRAME_NORMAL',
      timestamp: Date.now(),
      data: `frame_${Math.random().toString(36).substring(2, 9)}`,
    };

    addLog(
      setDeviceLogs,
      `Frame procesado. ${
        isPerson ? '¡Persona detectada!' : 'Sin eventos relevantes.'
      }`,
      isPerson ? 'alert' : 'info'
    );
    return frameData;
  };

  const simulateGatewayProcessing = (data: any) => {
    if (data.type === 'PERSONA_DETECTADA') {
      addLog(
        setGatewayLogs,
        'Alerta de alta prioridad recibida. Reenviando a la nube...',
        'alert'
      );
      // Simulate immediate cloud send
      setTimeout(() => simulateCloudProcessing(data), 500);
    } else {
      addLog(
        setGatewayLogs,
        `Dato normal recibido (${data.data}). Almacenando en búfer.`,
        'data'
      );
      setGatewayBuffer((prev) => [...prev, data]);
    }
  };

  const simulateCloudProcessing = (data: any) => {
    if (data.type === 'PERSONA_DETECTADA') {
      addLog(
        setCloudLogs,
        `ALERTA RECIBIDA: Persona detectada. Activando protocolo de seguridad.`,
        'alert'
      );
    } else if (data.type === 'RESUMEN_HORARIO') {
      addLog(
        setCloudLogs,
        `Lote de datos recibido con ${data.count} frames para análisis.`,
        'summary'
      );
    }
  };

  const handleSendData = (isPerson: boolean) => {
    setIsSimulating(true);
    addLog(setDeviceLogs, 'Capturando nuevo frame...');
    const deviceData = simulateDeviceProcessing(isPerson);

    setTimeout(() => {
      addLog(setGatewayLogs, `Recibiendo datos de dispositivo...`);
      simulateGatewayProcessing(deviceData);
      setIsSimulating(false);
    }, 500);
  };

  const handleProcessBuffer = () => {
    if (gatewayBuffer.length === 0) {
      addLog(setGatewayLogs, 'Búfer vacío. No hay nada que procesar.', 'info');
      return;
    }

    setIsSimulating(true);
    addLog(
      setGatewayLogs,
      `Agregando ${gatewayBuffer.length} frames del búfer para enviar a la nube...`,
      'summary'
    );
    const summaryData = {
      type: 'RESUMEN_HORARIO',
      count: gatewayBuffer.length,
      payload: gatewayBuffer.map((d) => d.data),
    };

    setTimeout(() => {
      simulateCloudProcessing(summaryData);
      setGatewayBuffer([]);
      addLog(setGatewayLogs, 'Búfer limpiado.', 'info');
      setIsSimulating(false);
    }, 500);
  };

  const handleReset = () => {
    setDeviceLogs([]);
    setGatewayLogs([]);
    setCloudLogs([]);
    setGatewayBuffer([]);
    setIsSimulating(false);
  };

  const LogDisplay = ({ title, logs, icon: Icon, bufferCount }: { title: string, logs: LogEntry[], icon: React.ElementType, bufferCount?: number }) => (
    <Card className="flex-1 min-w-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Icon className="h-6 w-6 text-primary" />
          <span>{title}</span>
          {bufferCount !== undefined && (
             <span className="ml-auto text-sm font-normal bg-muted text-muted-foreground rounded-full px-2 py-1">
              Búfer: {bufferCount}
            </span>
          )}
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
                    })}>{log.timestamp}</p>
                    <p className={cn({ "font-semibold": log.type === 'alert' })}>{log.message}</p>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center p-4 border rounded-lg bg-card">
        <div className='lg:col-span-2 space-y-2'>
           <h4 className="font-semibold text-center md:text-left">Controles de Simulación</h4>
            <p className="text-sm text-muted-foreground text-center md:text-left">Genera eventos para ver cómo responde la arquitectura.</p>
        </div>
        <div className="flex flex-col sm:flex-row lg:flex-col gap-2 w-full lg:col-span-2">
            <div className='flex-1 grid grid-cols-2 gap-2'>
              <Button onClick={() => handleSendData(false)} disabled={isSimulating} variant="outline">
                Enviar Frame (Normal)
              </Button>
              <Button onClick={() => handleSendData(true)} disabled={isSimulating} variant="destructive">
                Enviar Frame (Persona)
              </Button>
               <Button onClick={handleProcessBuffer} disabled={isSimulating || gatewayBuffer.length === 0}>
                Procesar Búfer
              </Button>
               <Button onClick={handleReset} variant="secondary">
                Reiniciar
              </Button>
            </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <LogDisplay title="Dispositivo Edge" logs={deviceLogs} icon={Camera} />
        <LogDisplay title="Pasarela Edge" logs={gatewayLogs} icon={Server} bufferCount={gatewayBuffer.length} />
        <LogDisplay title="Nube Central" logs={cloudLogs} icon={Cloud} />
      </div>
    </div>
  );
}
