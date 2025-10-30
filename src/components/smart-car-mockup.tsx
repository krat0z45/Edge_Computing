import { cn } from "@/lib/utils";
import { Car, AlertTriangle, Gauge, Zap } from 'lucide-react';

interface SmartCarMockupProps {
    status: 'normal' | 'braking' | 'accelerating' | 'failure';
    data: {
        speed: number;
        obstacle: boolean;
        failure: boolean;
    }
}

export function SmartCarMockup({ status, data }: SmartCarMockupProps) {
    const roadAnimationSpeed = data.speed > 0 ? (1 / data.speed) * 100 : 100;
    
    return (
        <div className={cn(
            "relative w-full max-w-sm mx-auto aspect-video rounded-lg bg-gray-800 p-4 border-2 border-gray-700 flex flex-col justify-end items-center overflow-hidden",
            "transition-all duration-500",
            { 'bg-red-900/80': data.failure }
        )}>
            {/* Road */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-600 perspective-800">
                <div 
                    className="absolute inset-0 h-full w-full bg-repeat-y bg-[length:100%_80px] bg-[linear-gradient(to_bottom,white_4px,transparent_4px)]"
                    style={{ animation: `move-road ${roadAnimationSpeed}s linear infinite` }}
                />
            </div>
            
            {/* Obstacle */}
            {data.obstacle && (
                 <div className="absolute bottom-[25%] left-1/2 -translate-x-1/2 z-20 animate-obstacle-appear">
                    <div className="w-12 h-12 bg-yellow-400 rounded-md border-2 border-yellow-200 flex items-center justify-center -rotate-12">
                        <AlertTriangle className="h-8 w-8 text-yellow-800 animate-pulse" />
                    </div>
                </div>
            )}

             {/* Failure Alert */}
             {data.failure && data.speed > 130 && (
                 <div className="absolute inset-0 z-40 bg-red-900/50 animate-pulse flex flex-col items-center justify-center text-white">
                    <AlertTriangle className="h-16 w-16 text-red-300 animate-ping" />
                    <p className="text-2xl font-bold mt-4">¡PELIGRO INMINENTE!</p>
                </div>
            )}

            {/* HUD */}
            <div className={cn(
                "relative z-30 w-full flex justify-between items-end text-white p-2 bg-black/30 rounded-t-lg backdrop-blur-sm transition-all duration-300",
                { 'shake': data.failure && data.speed > 100 }
            )}>
                <div className="flex flex-col items-center">
                    <Gauge className="h-8 w-8 text-cyan-300" />
                    <span className="text-2xl font-bold">{Math.round(data.speed)}</span>
                    <span className="text-xs text-gray-400">km/h</span>
                </div>
                <div className={cn("flex flex-col items-center p-2 rounded-lg transition-colors duration-300", {
                    "bg-green-500/20 text-green-300": status === 'normal' || status === 'accelerating',
                    "bg-yellow-500/30 text-yellow-200": status === 'braking',
                    "bg-red-500/40 text-red-200 animate-pulse": status === 'failure',
                })}>
                    {status === 'normal' && <Car className="h-6 w-6" />}
                    {status === 'accelerating' && <Car className="h-6 w-6 animate-bounce" />}
                    {status === 'braking' && <Car className="h-6 w-6" />}
                    {status === 'failure' && <Zap className="h-6 w-6" />}
                    <span className="text-xs font-bold capitalize mt-1">
                        {status === 'normal' ? 'Normal' : status === 'braking' ? 'Frenando' : status === 'accelerating' ? 'Acelerando' : '¡Falla!'}
                    </span>
                </div>
            </div>

            <style jsx>{`
                .perspective-800 {
                    perspective: 800px;
                    transform-style: preserve-3d;
                }
                .perspective-800 > div {
                    transform: rotateX(60deg) scale(1.5);
                }
                @keyframes move-road {
                    from { background-position-y: 0; }
                    to { background-position-y: -80px; }
                }

                @keyframes obstacle-appear {
                    from { transform: translateY(100%) scale(0.5); opacity: 0; }
                    to { transform: translateY(0) scale(1); opacity: 1; }
                }
                .animate-obstacle-appear {
                    animation: obstacle-appear 0.5s ease-out forwards;
                }

                @keyframes shake {
                    0% { transform: translate(1px, 1px) rotate(0deg); }
                    10% { transform: translate(-1px, -2px) rotate(-1deg); }
                    20% { transform: translate(-3px, 0px) rotate(1deg); }
                    30% { transform: translate(3px, 2px) rotate(0deg); }
                    40% { transform: translate(1px, -1px) rotate(1deg); }
                    50% { transform: translate(-1px, 2px) rotate(-1deg); }
                    60% { transform: translate(-3px, 1px) rotate(0deg); }
                    70% { transform: translate(3px, 1px) rotate(-1deg); }
                    80% { transform: translate(-1px, -1px) rotate(1deg); }
                    90% { transform: translate(1px, 2px) rotate(0deg); }
                    100% { transform: translate(1px, -2px) rotate(-1deg); }
                }

                .shake {
                    animation: shake 0.2s infinite;
                }
            `}</style>
        </div>
    );
}