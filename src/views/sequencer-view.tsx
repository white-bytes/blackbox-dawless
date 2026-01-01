'use client';

import * as React from 'react';
import { SynthModule } from '@/components/synth-module';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Led } from '@/components/led';

const steps = 16;
const tracks = 4;

export function SequencerView() {
  const [activeSteps, setActiveSteps] = React.useState<boolean[][]>(
    Array.from({ length: tracks }, () => Array(steps).fill(false))
  );
  const [currentStep, setCurrentStep] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const toggleStep = (trackIndex: number, stepIndex: number) => {
    const newActiveSteps = [...activeSteps];
    newActiveSteps[trackIndex][stepIndex] = !newActiveSteps[trackIndex][stepIndex];
    setActiveSteps(newActiveSteps);
  };

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % steps);
      }, 150);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <SynthModule title="16-Step Sequencer">
      <div className="grid gap-4">
        <div className="flex items-center gap-4">
          <Button onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? 'Stop' : 'Play'}
          </Button>
          <div className="flex items-center gap-2">
            <Led active={isPlaying} animated={isPlaying} />
            <span className="text-sm text-muted-foreground">
              Step: {currentStep + 1}
            </span>
          </div>
        </div>
        <div className="grid gap-2 overflow-x-auto">
          {activeSteps.map((track, trackIndex) => (
            <div key={trackIndex} className="flex gap-1.5">
              <div className="w-16 text-xs text-muted-foreground self-center">Track {trackIndex + 1}</div>
              {track.map((isActive, stepIndex) => (
                <button
                  key={stepIndex}
                  onClick={() => toggleStep(trackIndex, stepIndex)}
                  className={cn(
                    'h-10 w-10 rounded-md transition-colors',
                    'border-2',
                    {
                      'bg-primary/80 border-primary': isActive,
                      'bg-card-foreground/10 border-card-foreground/20 hover:bg-card-foreground/20': !isActive,
                      'ring-2 ring-accent ring-offset-2 ring-offset-background': currentStep === stepIndex,
                    }
                  )}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </SynthModule>
  );
}
