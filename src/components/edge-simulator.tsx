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

type SoundType = 'engine' | 'brake' | 'alert' | 'alarm' | 'powerDown' | 'confirmation';

export function EdgeSimulator() {
  const [deviceLogs, setDeviceLogs] = useState<LogEntry[]>([]);
  const [gatewayLogs, setGatewayLogs] = useState<LogEntry[]>([]);
  const [cloudLogs, setCloudLogs] = useState<LogEntry[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [carStatus, setCarStatus] = useState<CarStatus>('normal');
  const [simulationData, setSimulationData] = useState({ speed: 0, obstacle: false, failure: false });
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const engineSoundSourceRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      stopEngineSound();
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, []);

  const getAudioContext = () => {
    if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch (e) {
        console.error("Web Audio API is not supported in this browser.");
        return null;
      }
    }
    return audioContextRef.current;
  };
  
  const playSound = (type: SoundType, duration: number = 0.5, speed?: number) => {
    const audioContext = getAudioContext();
    if (!audioContext) return;

    if (type === 'engine') {
        if (!engineSoundSourceRef.current) {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.type = 'sawtooth';
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            oscillator.start();

            engineSoundSourceRef.current = oscillator;
            gainNodeRef.current = gainNode;
        }

        const maxSpeed = 150;
        const minFreq = 40;
        const maxFreq = 120;
        const currentSpeed = speed || 0;
        const frequency = minFreq + (currentSpeed / maxSpeed) * (maxFreq - minFreq);
        engineSoundSourceRef.current.frequency.setTargetAtTime(frequency, audioContext.currentTime, 0.1);

        const targetGain = currentSpeed > 0 ? 0.1 : 0;
        gainNodeRef.current?.gain.setTargetAtTime(targetGain, audioContext.currentTime, 0.2);

        return;
    }

    if (engineSoundSourceRef.current) {
       gainNodeRef.current?.gain.setTargetAtTime(0, audioContext.currentTime, 0.1);
    }

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    switch(type) {
        case 'brake':
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(1200, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + duration);
            gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);
            break;
        case 'alert':
             oscillator.type = 'triangle';
             gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
             oscillator.frequency.setValueAtTime(1500, audioContext.currentTime);
             gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);
             break;
        case 'alarm':
             oscillator.type = 'square';
             gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
             oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
             oscillator.frequency.setTargetAtTime(1200, audioContext.currentTime + duration / 2, 0.1);
             gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);
             break;
        case 'powerDown':
            oscillator.type = 'sawtooth';
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(120, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(20, audioContext.currentTime + duration);
            gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);
            break;
        case 'confirmation':
            oscillator.type = 'sine';
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);
            break;
    }
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  };
  
  const stopEngineSound = () => {
    const audioContext = getAudioContext();
     if (!audioContext) return;
    if (engineSoundSourceRef.current) {
        gainNodeRef.current?.gain.setTargetAtTime(0, audioContext.currentTime, 0.1);
        setTimeout(() => {
            engineSoundSourceRef.current?.stop();
            engineSoundSourceRef.current?.disconnect();
            engineSoundSourceRef.current = null;
            gainNodeRef.current?.disconnect();
            gainNodeRef.current = null;
        }, 200);
    }
  };

  const addLog = (
    setLogs: React.Dispatch<React.SetStateAction<LogEntry[]>>,
    message: string,
    type: LogEntry['type']
  ) => {
    const timestamp = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    setLogs((prev) => [{ message, type, timestamp }, ...prev]);
  };

  const simulateProgressiveChange = (start: number, end: number, duration: number, stepCallback: (currentValue: number) => void, finalCallback: () => void) => {
    const change = end - start;
    const increment = change / (duration / 50);
    let currentValue = start;
    const simInterval = setInterval(() => {
        currentValue += increment;
        if ((increment > 0 && currentValue >= end) || (increment < 0 && currentValue <= end)) {
            currentValue = end;
            clearInterval(simInterval);
            stepCallback(currentValue);
            finalCallback();
        } else {
            stepCallback(currentValue);
        }
    }, 50);
  }

  const simulateDeviceEvent = (type: 'normal' | 'obstacle' | 'failure') => {
    if (isSimulating) return;
    setIsSimulating(true);

    if (type === 'normal') {
        setCarStatus('accelerating');
        addLog(setDeviceLogs, `Iniciando conducción normal. Acelerando a 100 km/h.`, 'info');
        simulateProgressiveChange(simulationData.speed, 100, 2000, 
            (speed) => {
                setSimulationData(prev => ({ ...prev, speed }));
                playSound('engine', 0.1, speed);
            },
            () => {
                setCarStatus('normal');
                setIsSimulating(false);
                addLog(setDeviceLogs, `Velocidad de crucero alcanzada.`, 'info');
            }
        );
    }

    if (type === 'obstacle') {
        addLog(setDeviceLogs, `¡Obstáculo detectado!`, 'alert');
        playSound('alert', 0.5);
        setSimulationData(prev => ({...prev, obstacle: true}));
        
        setTimeout(() => {
             addLog(setGatewayLogs, `Obstáculo confirmado. Iniciando frenado de emergencia.`, 'action');
             setCarStatus('braking');
             playSound('brake', 1.0);
             simulateProgressiveChange(simulationData.speed, 0, 1500,
                (speed) => {
                   setSimulationData(prev => ({ ...prev, speed }));
                   playSound('engine', 0.1, speed);
                },
                () => {
                    addLog(setGatewayLogs, `Vehículo detenido. Esperando a que el obstáculo se despeje.`, 'info');
                    addLog(setCloudLogs, `Incidente de Frenado de Emergencia registrado.`, 'summary');
                    setTimeout(() => {
                        addLog(setDeviceLogs, `El obstáculo se ha despejado. Reanudando la marcha.`, 'info');
                        setSimulationData(prev => ({...prev, obstacle: false}));
                        setCarStatus('accelerating');
                         simulateProgressiveChange(0, 100, 2000, 
                            (speed) => {
                                setSimulationData(prev => ({ ...prev, speed }));
                                playSound('engine', 0.1, speed);
                            },
                            () => {
                                setCarStatus('normal');
                                setIsSimulating(false);
                            }
                        );
                    }, 3000);
                }
             );
        }, 500);
    }
    
    if (type === 'failure') {
        addLog(setDeviceLogs, `¡Falla detectada en el sistema del acelerador!`, 'alert');
        playSound('alarm', 1.5);
        setSimulationData(prev => ({ ...prev, failure: true }));
        setCarStatus('failure');
        
        setTimeout(() => {
            addLog(setGatewayLogs, `Anomalía Crítica: Aceleración no controlada.`, 'warning');
            simulateProgressiveChange(simulationData.speed, 150, 1000, 
            (speed) => {
                setSimulationData(prev => ({ ...prev, speed }));
                playSound('engine', 0.1, speed);
            },
            () => {
                addLog(setGatewayLogs, `¡PELIGRO INMINENTE! Anulando sistema de aceleración AHORA.`, 'action');
                setSimulationData(prev => ({ ...prev, speed: 160 }));
                playSound('powerDown', 1.0);
                setTimeout(() => {
                    setCarStatus('braking');
                    simulateProgressiveChange(160, 0, 2000,
                    (speed) => {
                        setSimulationData(prev => ({ ...prev, speed }));
                         playSound('engine', 0.1, speed);
                    },
                    () => {
                        stopEngineSound();
                        addLog(setGatewayLogs, `Falla contenida. El vehículo se ha detenido.`, 'info');
                        addLog(setCloudLogs, `Falla Crítica de Acelerador Registrada. Sistema de anulación fue exitoso.`, 'alert');
                        setCarStatus('normal');
                        setSimulationData(prev => ({ ...prev, failure: false }));
                        setIsSimulating(false);
                    });
                }, 1000);
            });
        }, 500);
    }
  };

  const handleReset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDeviceLogs([]);
    setGatewayLogs([]);
    setCloudLogs([]);
    setIsSimulating(false);
    setCarStatus('normal');
    setSimulationData({ speed: 0, obstacle: false, failure: false });
    stopEngineSound();
    playSound('confirmation', 0.3);
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
