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
    <div className="relative w-full max-w-sm mx-auto aspect-video rounded-lg bg-muted/30 p-4 border-2 border-dashed border-border flex items-end justify-center overflow-hidden">
        <div className="w-full h-full flex items-end justify-center">
            {/* Base */}
            <div className="w-28 h-6 bg-primary/80 border-t-2 border-primary rounded-t-lg z-10"/>

            {/* Brazo - Segmento 1 */}
            <div className={cn(
                "absolute bottom-[2.5rem] left-1/2 -translate-x-1/2 w-10 h-28 bg-card border-2 border-primary origin-bottom",
                status === 'normal' && 'animate-arm-normal',
                status === 'warning' && 'animate-arm-warning',
                status === 'error' && 'animate-arm-error-base'
            )}>
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-primary border-2 border-card"/>
            </div>

            {/* Brazo - Segmento 2 (Garra) */}
             <div className={cn(
                "absolute bottom-[8.5rem] left-[calc(50%-3.2rem)] w-8 h-20 bg-card border-2 border-primary origin-bottom",
                 status === 'normal' && 'animate-gripper-normal',
                 status === 'warning' && 'animate-gripper-warning',
                 status === 'error' && 'animate-gripper-error'
            )}>
                {/* Garra */}
                <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-5 h-5 border-2 border-primary rounded-sm bg-card"/>
            </div>
            
            {/* Indicador de Estado */}
            <div className="absolute top-2 right-2 flex flex-col items-center gap-1 text-xs font-bold p-2 rounded-md bg-card/80 backdrop-blur-sm">
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

            {/* Datos en Pantalla */}
            <div className="absolute top-2 left-2 flex flex-col gap-2 text-xs p-2 rounded-md bg-card/80 backdrop-blur-sm">
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
        .animate-arm-normal {
          animation: arm-normal-anim 8s ease-in-out infinite;
        }
        .animate-gripper-normal {
          animation: gripper-normal-anim 8s ease-in-out infinite;
        }
        .animate-arm-warning {
          animation: arm-warning-anim 2s ease-in-out infinite;
        }
        .animate-gripper-warning {
          animation: gripper-warning-anim 2s ease-in-out infinite;
        }
        .animate-arm-error-base {
            transform: rotate(-10deg);
        }
        .animate-gripper-error {
          animation: shake 0.3s cubic-bezier(.36,.07,.19,.97) both infinite;
          transform-origin: bottom;
          transform: rotate(50deg);
        }

        @keyframes arm-normal-anim {
          0%, 100% { transform: rotate(-20deg); }
          50% { transform: rotate(20deg); }
        }
        @keyframes gripper-normal-anim {
          0%, 100% { transform: rotate(30deg); }
          25% { transform: rotate(10deg); }
          50% { transform: rotate(-15deg); }
          75% { transform: rotate(40deg); }
        }
        @keyframes arm-warning-anim {
          0%, 100% { transform: rotate(-15deg); }
          50% { transform: rotate(15deg); }
        }
        @keyframes gripper-warning-anim {
          0%, 100% { transform: rotate(25deg) translateX(2px); }
          50% { transform: rotate(15deg) translateX(-2px); }
        }
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0) rotate(50deg); }
          20%, 80% { transform: translate3d(2px, 0, 0) rotate(50deg); }
          30%, 50%, 70% { transform: translate3d(-3px, 0, 0) rotate(50deg); }
          40%, 60% { transform: translate3d(3px, 0, 0) rotate(50deg); }
        }
      `}</style>
    </div>
  );
}
