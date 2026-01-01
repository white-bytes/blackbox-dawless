"use client";

import * as React from "react";
import { Cpu } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function StatusIndicators() {
  const [cpuLoad, setCpuLoad] = React.useState(0);
  const [memory, setMemory] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCpuLoad(Math.random() * 60 + 10);
      setMemory(Math.random() * 40 + 20);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2 cursor-pointer">
            <Cpu className="h-5 w-5 text-muted-foreground" />
            <div className="w-20">
              <Progress value={cpuLoad} className="h-2" />
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="grid gap-2 text-sm">
            <div className="flex items-center justify-between">
              <span>CPU Load:</span>
              <span className="font-semibold">{cpuLoad.toFixed(1)}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Memory:</span>
              <span className="font-semibold">{memory.toFixed(1)}%</span>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
