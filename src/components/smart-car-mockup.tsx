import { cn } from "@/lib/utils";
import { Car, AlertTriangle, Snowflake, Wind, Gauge } from 'lucide-react';

interface SmartCarMockupProps {
    status: 'normal' | 'alert' | 'weather_alert';
    data: {
        speed: number;
        obstacle: boolean;
        weather: 'clear' | 'rain';
    }
}

export function SmartCarMockup({ status, data }: SmartCarMockupProps) {
    return (
        <div className={cn(
            "relative w-full max-w-sm mx-auto aspect-video rounded-lg bg-gray-800 p-4 border-2 border-gray-700 flex flex-col justify-end items-center overflow-hidden",
            "transition-all duration-500",
            { 'bg-blue-900/50': data.weather === 'rain' }
        )}>
            {/* Road */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-600 perspective-800">
                <div className="absolute inset-0 h-full w-full animate-road-lines bg-repeat-y bg-[length:100%_80px] bg-[linear-gradient(to_bottom,white_4px,transparent_4px)]" />
            </div>

            {/* Rain effect */}
            {data.weather === 'rain' && (
                <div className="absolute inset-0 z-10 pointer-events-none">
                    <div className="absolute h-full w-full animate-rain-1 bg-repeat-y bg-[length:1rem_1rem] bg-[linear-gradient(to_bottom,rgba(255,255,255,0.4)_1px,transparent_1px)]" />
                    <div className="absolute h-full w-full animate-rain-2 bg-repeat-y bg-[length:1.2rem_1.2rem] bg-[linear-gradient(to_bottom,rgba(255,255,255,0.3)_1px,transparent_1px)]" />
                </div>
            )}
            
            {/* Obstacle */}
            {data.obstacle && (
                 <div className="absolute bottom-[25%] left-1/2 -translate-x-1/2 z-20 animate-obstacle-appear">
                    <div className="w-12 h-12 bg-yellow-400 rounded-md border-2 border-yellow-200 flex items-center justify-center -rotate-12">
                        <AlertTriangle className="h-8 w-8 text-yellow-800 animate-pulse" />
                    </div>
                </div>
            )}

            {/* HUD */}
            <div className="relative z-30 w-full flex justify-between items-end text-white p-2 bg-black/30 rounded-t-lg backdrop-blur-sm">
                <div className="flex flex-col items-center">
                    <Gauge className="h-8 w-8 text-cyan-300" />
                    <span className="text-2xl font-bold">{data.speed}</span>
                    <span className="text-xs text-gray-400">km/h</span>
                </div>
                <div className={cn("flex flex-col items-center p-2 rounded-lg transition-colors", {
                    "bg-green-500/20 text-green-300": status === 'normal',
                    "bg-red-500/30 text-red-200 animate-pulse": status === 'alert',
                    "bg-blue-500/30 text-blue-200": status === 'weather_alert',
                })}>
                    {status === 'normal' && <Car className="h-6 w-6" />}
                    {status === 'alert' && <AlertTriangle className="h-6 w-6" />}
                    {status === 'weather_alert' && <Snowflake className="h-6 w-6" />}
                    <span className="text-xs font-bold capitalize mt-1">
                        {status === 'normal' ? 'Normal' : status === 'alert' ? '¡Alerta!' : 'Precaución'}
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
                .animate-road-lines { animation: move-road 2s linear infinite; }
                @keyframes move-road {
                    from { background-position-y: 0; }
                    to { background-position-y: -80px; }
                }

                .animate-rain-1 { animation: rain-fall 0.5s linear infinite; }
                .animate-rain-2 { animation: rain-fall 0.8s linear infinite 0.2s; }
                @keyframes rain-fall {
                    from { transform: translateY(-20px); opacity: 0; }
                    to { transform: translateY(100%); opacity: 1; }
                }

                @keyframes obstacle-appear {
                    from { transform: translateY(100%) scale(0.5); opacity: 0; }
                    to { transform: translateY(0) scale(1); opacity: 1; }
                }
                .animate-obstacle-appear {
                    animation: obstacle-appear 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
}

    