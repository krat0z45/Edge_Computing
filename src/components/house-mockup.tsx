import { cn } from "@/lib/utils";
import { DoorOpen, Wind, Thermometer, Sun } from 'lucide-react';

interface HouseMockupProps {
  isACOn: boolean;
  motionDetected: boolean;
  temperature: number;
}

const TEMP_HOT = 28;
const TEMP_COLD = 20;

export function HouseMockup({ isACOn, motionDetected, temperature }: HouseMockupProps) {
  const isHot = temperature > TEMP_HOT;
  const isCold = temperature < TEMP_COLD;

  return (
    <div className="relative w-full max-w-sm mx-auto aspect-square rounded-lg bg-muted/30 p-4 border-2 border-dashed border-border flex items-center justify-center">
      <div className={cn(
        "relative w-full h-full bg-background rounded transition-colors duration-500",
        { 
          "bg-orange-100": isHot && !isACOn,
          "bg-cyan-100": isCold && !isACOn,
          "bg-blue-100": isACOn 
        }
      )}>
        {/* House Outline */}
        <div className="absolute inset-0 border-2 border-primary rounded" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[80px] border-l-transparent border-r-[80px] border-r-transparent border-b-[60px] border-b-primary -mt-[60px]" />

        {/* Temperature State Icon */}
        <div className="absolute top-2 left-2 flex items-center gap-1 text-sm font-bold">
           {isHot && !isACOn && <Sun className="h-5 w-5 text-orange-500 animate-pulse" />}
           {isCold && !isACOn && <Thermometer className="h-5 w-5 text-cyan-500" />}
           <span className={cn({
               "text-orange-600": isHot,
               "text-cyan-600": isCold,
               "text-muted-foreground": !isHot && !isCold,
           })}>{temperature}°C</span>
        </div>

        {/* Living Room */}
        <div className={cn(
          "absolute top-10 left-4 bottom-4 w-1/2 bg-card/50 rounded-l-sm transition-colors duration-200",
          { "bg-yellow-200/80 animate-pulse": motionDetected }
        )}>
          <div className="p-2 text-center">
            <DoorOpen className="h-6 w-6 mx-auto text-muted-foreground" />
            <p className="text-xs font-semibold text-muted-foreground">Living</p>
            {motionDetected && <p className="text-xs font-bold text-yellow-700">Movimiento</p>}
          </div>
        </div>

        {/* Bedroom */}
        <div className="absolute top-10 right-4 bottom-4 w-[calc(50%-2rem)] bg-card/50 rounded-r-sm">
           <div className="p-2 text-center">
            <svg className="h-6 w-6 mx-auto text-muted-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4v16h20V4Z"/><path d="M2 10h20"/><path d="M10 4v6"/><path d="M14 10V4"/></svg>
            <p className="text-xs font-semibold text-muted-foreground">Dormitorio</p>
          </div>
        </div>
        
        {/* AC Status Icon */}
        <div className={cn(
            "absolute -top-3 -right-3 h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300",
            isACOn ? 'bg-blue-500 text-white' : 'bg-card text-muted-foreground'
        )}>
           <Wind className={cn("h-6 w-6", {"animate-spin-slow": isACOn})} />
        </div>
      </div>
       <style jsx>{`
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
