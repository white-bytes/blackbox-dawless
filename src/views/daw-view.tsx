'use client';

import { Play, StopCircle, Mic, Volume2 } from 'lucide-react';
import { SynthModule } from '@/components/synth-module';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

export function DawView() {
  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-3">
      <SynthModule title="Transport" className="lg:col-span-1">
        <div className="grid grid-cols-3 gap-4">
          <Button variant="secondary" size="lg" className="flex flex-col h-24">
            <Play className="h-8 w-8" />
            <span>Play</span>
          </Button>
          <Button variant="secondary" size="lg" className="flex flex-col h-24">
            <StopCircle className="h-8 w-8" />
            <span>Stop</span>
          </Button>
          <Button variant="destructive" size="lg" className="flex flex-col h-24">
            <Mic className="h-8 w-8" />
            <span>Record</span>
          </Button>
        </div>
      </SynthModule>
      <SynthModule title="Mixer" className="lg:col-span-2">
        <div className="grid grid-cols-4 md:grid-cols-8 gap-x-4 gap-y-2 justify-items-center">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="grid gap-2 justify-items-center">
              <Slider
                defaultValue={[Math.floor(Math.random() * 75) + 10]}
                max={100}
                step={1}
                orientation="vertical"
                className="h-32"
              />
               <Button variant="outline" size="sm" className="w-full">
                <Volume2 className="h-4 w-4 mr-2" /> {i + 1}
              </Button>
            </div>
          ))}
        </div>
      </SynthModule>
    </div>
  );
}
