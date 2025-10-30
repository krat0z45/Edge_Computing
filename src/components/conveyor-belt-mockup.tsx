import { cn } from "@/lib/utils";
import { Waves, AlertTriangle, CheckCircle, XCircle, Package } from 'lucide-react';

interface ConveyorBeltMockupProps {
    status: 'normal' | 'warning' | 'error';
    data: {
        speed: number;
        errors: number;
    }
}

export function ConveyorBeltMockup({ status, data }: ConveyorBeltMockupProps) {

  return (
    <div className="relative w-full max-w-sm mx-auto aspect-video rounded-lg bg-muted/30 p-4 border-2 border-dashed border-border flex flex-col justify-center items-center overflow-hidden">
        
        {/* Conveyor Belt Structure */}
        <div className="w-full h-16 bg-primary/20 border-y-4 border-primary/50 flex items-center relative overflow-hidden">
            {/* Belt pattern */}
            <div className={cn(
                "absolute inset-0 h-full w-[200%] bg-repeat-x bg-[length:40px_100%]",
                "bg-[linear-gradient(90deg,hsl(var(--primary)/.6)_2px,transparent_2px)]",
                 status === 'normal' && 'animate-belt-normal',
                 status === 'warning' && 'animate-belt-warning',
                 status === 'error' && 'animate-belt-error'
            )} />

            {/* Boxes */}
            <div className={cn(
              "absolute w-full h-full",
              status === 'normal' && 'animate-boxes-normal',
              status === 'warning' && 'animate-boxes-warning',
              status === 'error' && 'animate-boxes-error'
            )}>
              <Package className="absolute h-10 w-10 text-primary/80 top-1/2 -translate-y-1/2 box-1" />
              <Package className={cn("absolute h-10 w-10 text-primary/80 top-1/2 -translate-y-1/2 box-2", {
                'animate-box-fall': status === 'error'
              })} />
              <Package className="absolute h-10 w-10 text-primary/80 top-1/2 -translate-y-1/2 box-3" />
            </div>

             {/* Crack overlay for error state */}
            {status === 'error' && (
                <div className="absolute inset-0 z-20">
                    <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                        <path d="M 0 20 L 30 15 L 40 25 L 60 10 L 70 30 L 100 20" fill="none" stroke="hsl(var(--destructive))" strokeWidth="1" className="animate-crack"/>
                    </svg>
                </div>
            )}
        </div>

        {/* Status Indicator */}
        <div className="absolute top-2 right-2 flex flex-col items-center gap-1 text-xs font-bold p-2 rounded-md bg-card/80 backdrop-blur-sm z-30">
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

        {/* Data Overlay */}
        <div className="absolute top-2 left-2 flex flex-col gap-2 text-xs p-2 rounded-md bg-card/80 backdrop-blur-sm z-30">
            <div className="flex items-center gap-1">
                <Waves className="h-4 w-4 text-primary"/>
                <span>Velocidad: <strong>{data.speed.toFixed(2)} m/s</strong></span>
            </div>
             <div className="flex items-center gap-1">
                <XCircle className="h-4 w-4 text-destructive"/>
                <span>Fallos: <strong>{data.errors}</strong></span>
            </div>
        </div>
        
       <style jsx>{`
        .animate-belt-normal { animation: move-belt 5s linear infinite; }
        .animate-boxes-normal { animation: move-boxes 5s linear infinite; }
        .animate-belt-warning { animation: move-belt 2s linear infinite, shake 0.5s linear infinite alternate; }
        .animate-boxes-warning { animation: move-boxes 2s linear infinite, shake 0.5s linear infinite alternate; }
        
        .animate-belt-error, .animate-boxes-error { animation-play-state: paused; }
        
        .box-1 { left: -10%; }
        .box-2 { left: 35%; }
        .box-3 { left: 80%; }

        @keyframes move-belt {
            from { background-position-x: 0; }
            to { background-position-x: -80px; }
        }

        @keyframes move-boxes {
            from { transform: translateX(0%); }
            to { transform: translateX(100%); }
        }

        @keyframes shake {
            from { transform: translate(1px, 1px); }
            to { transform: translate(-1px, -1px); }
        }
        
        @keyframes box-fall {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            50% { transform: translateY(30px) rotate(20deg); opacity: 1; }
            100% { transform: translateY(80px) rotate(90deg); opacity: 0; }
        }
        
        .animate-box-fall {
            animation: box-fall 1s ease-out forwards;
            animation-delay: 0.2s;
            z-index: 10;
        }

        @keyframes crack-draw {
            to { stroke-dashoffset: 0; }
        }
        .animate-crack {
            stroke-dasharray: 150;
            stroke-dashoffset: 150;
            animation: crack-draw 0.8s ease-out forwards;
            animation-delay: 1.2s;
        }
      `}</style>
    </div>
  );
}

    