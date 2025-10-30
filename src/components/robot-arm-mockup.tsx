import { cn } from "@/lib/utils";
import { Waves, Thermometer, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface RobotArmMockupProps {
    status: 'normal' | 'warning' | 'error';
    data: {
        vibration: number;
        temp: number;
        errors: number;
    }
}

export function RobotArmMockup({ status, data }: RobotArmMockupProps) {

  return (
    <div className="relative w-full max-w-sm mx-auto aspect-video rounded-lg bg-muted/30 p-4 border-2 border-dashed border-border flex items-end justify-center">
        <div className="w-full h-2/3 flex items-end justify-center">
            {/* Base */}
            <div className="w-24 h-4 bg-primary rounded-t-md z-10"/>

            {/* Arm Segment 1 */}
            <div className={cn(
                "absolute bottom-[3rem] left-1/2 -translate-x-1/2 w-8 h-24 bg-card border-2 border-primary origin-bottom transition-transform duration-300",
                {
                    "rotate-[-20deg]": status === 'normal',
                    "rotate-[-15deg]": status === 'warning',
                    "rotate-[-25deg]": status === 'error',
                }
            )}>
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary border-2 border-card"/>
            </div>

            {/* Arm Segment 2 (Gripper) */}
             <div className={cn(
                "absolute bottom-[8.2rem] left-[calc(50%-2.3rem)] w-6 h-16 bg-card border-2 border-primary origin-bottom transition-transform duration-300",
                {
                    "rotate-[30deg]": status === 'normal',
                    "rotate-[20deg]": status === 'warning',
                    "rotate-[40deg] animate-shake": status === 'error',
                }
            )}>
                {/* Gripper */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 border-2 border-primary rounded-sm"/>
            </div>
            
            {/* Status Indicator */}
            <div className="absolute top-2 right-2 flex flex-col items-center gap-1 text-xs font-bold p-2 rounded-md bg-card/80">
                <p>Estado</p>
                <div className={cn("flex items-center gap-1 px-2 py-1 rounded", {
                    "bg-green-100 text-green-700": status === 'normal',
                    "bg-yellow-100 text-yellow-700": status === 'warning',
                    "bg-red-100 text-red-700 animate-pulse": status === 'error',
                })}>
                    {status === 'normal' && <CheckCircle className="h-4 w-4" />}
                    {status === 'warning' && <AlertTriangle className="h-4 w-4" />}
                    {status === 'error' && <XCircle className="h-4 w-4" />}
                    <span className="capitalize">{status === 'error' ? 'Fallo' : status === 'warning' ? 'Alerta' : 'Normal'}</span>
                </div>
            </div>

            {/* Data Display */}
            <div className="absolute top-2 left-2 flex flex-col gap-2 text-xs p-2 rounded-md bg-card/80">
                <div className="flex items-center gap-1">
                    <Waves className="h-4 w-4 text-primary"/>
                    <span>Vibración: <strong>{data.vibration} Hz</strong></span>
                </div>
                <div className="flex items-center gap-1">
                    <Thermometer className="h-4 w-4 text-primary"/>
                    <span>Temp: <strong>{data.temp}°C</strong></span>
                </div>
                 <div className="flex items-center gap-1">
                    <XCircle className="h-4 w-4 text-destructive"/>
                    <span>Errores: <strong>{data.errors}</strong></span>
                </div>
            </div>
        </div>
        
       <style jsx>{`
        .animate-shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both infinite;
        }
        @keyframes shake {
          10%, 90% {
            transform: translate3d(-1px, 0, 0) rotate(40deg);
          }
          20%, 80% {
            transform: translate3d(2px, 0, 0) rotate(40deg);
          }
          30%, 50%, 70% {
            transform: translate3d(-3px, 0, 0) rotate(40deg);
          }
          40%, 60% {
            transform: translate3d(3px, 0, 0) rotate(40deg);
          }
        }
      `}</style>
    </div>
  );
}
