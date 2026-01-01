'use client';

import * as React from 'react';
import { SynthModule } from '@/components/synth-module';
import { ControlGroup } from '@/components/control-group';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Led } from '@/components/led';
import { Button } from '@/components/ui/button';

export function SynthView() {
  const [lfoActive, setLfoActive] = React.useState(true);
  const [osc2Active, setOsc2Active] = React.useState(true);
  
  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-4 xl:grid-cols-5">
      <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 xl:col-span-3">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
          <SynthModule title="Oscillator 1">
            <div className="grid gap-6">
              <ControlGroup label="Waveform">
                <Select defaultValue="saw">
                  <SelectTrigger>
                    <SelectValue placeholder="Select waveform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sine">Sine</SelectItem>
                    <SelectItem value="square">Square</SelectItem>
                    <SelectItem value="saw">Saw</SelectItem>
                    <SelectItem value="triangle">Triangle</SelectItem>
                  </SelectContent>
                </Select>
              </ControlGroup>
              <ControlGroup label="Coarse Tune">
                <Slider defaultValue={[0]} max={24} step={1} />
              </ControlGroup>
              <ControlGroup label="Fine Tune">
                <Slider defaultValue={[50]} max={100} step={1} />
              </ControlGroup>
            </div>
          </SynthModule>
          <SynthModule title="Oscillator 2">
            <div className="grid gap-6">
              <ControlGroup label="Waveform">
                <Select defaultValue="square" disabled={!osc2Active}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select waveform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sine">Sine</SelectItem>
                    <SelectItem value="square">Square</SelectItem>
                    <SelectItem value="saw">Saw</SelectItem>
                    <SelectItem value="triangle">Triangle</SelectItem>
                  </SelectContent>
                </Select>
              </ControlGroup>
              <ControlGroup label="Coarse Tune">
                <Slider defaultValue={[12]} max={24} step={1} disabled={!osc2Active} />
              </ControlGroup>
               <Button variant={osc2Active ? 'secondary' : 'outline'} size="sm" onClick={() => setOsc2Active(!osc2Active)}>
                <Led active={osc2Active} color="primary" />
                <span className="ml-2">{osc2Active ? 'On' : 'Off'}</span>
              </Button>
            </div>
          </SynthModule>
          <SynthModule title="Global">
             <div className="grid gap-6">
              <ControlGroup label="Mix">
                <Slider defaultValue={[40]} max={100} step={1} />
              </ControlGroup>
              <ControlGroup label="Volume">
                <Slider defaultValue={[75]} max={100} step={1} />
              </ControlGroup>
              <div className="flex items-center gap-4 pt-2">
                 <Led active={true} animated={true} />
                 <span className="text-sm text-muted-foreground">Clock</span>
              </div>
            </div>
          </SynthModule>
        </div>
      </div>

      <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 xl:col-span-2">
         <div className="grid gap-4 sm:grid-cols-2">
            <SynthModule title="Filter (VCF)">
              <div className="grid gap-6">
                <ControlGroup label="Type">
                  <Select defaultValue="lp">
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lp">Low-Pass</SelectItem>
                      <SelectItem value="hp">High-Pass</SelectItem>
                      <SelectItem value="bp">Band-Pass</SelectItem>
                    </SelectContent>
                  </Select>
                </ControlGroup>
                <ControlGroup label="Cutoff">
                  <Slider defaultValue={[60]} max={100} step={1} />
                </ControlGroup>
                <ControlGroup label="Resonance">
                  <Slider defaultValue={[25]} max={100} step={1} />
                </ControlGroup>
              </div>
            </SynthModule>
            <SynthModule title="LFO">
              <div className="grid gap-6">
                <ControlGroup label="Waveform">
                  <Select defaultValue="sine" disabled={!lfoActive}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select waveform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sine">Sine</SelectItem>
                      <SelectItem value="square">Square</SelectItem>
                      <SelectItem value="saw">Saw</SelectItem>
                    </SelectContent>
                  </Select>
                </ControlGroup>
                <ControlGroup label="Rate">
                  <Slider defaultValue={[30]} max={100} step={1} disabled={!lfoActive} />
                </ControlGroup>
                <Button variant={lfoActive ? 'secondary' : 'outline'} size="sm" onClick={() => setLfoActive(!lfoActive)}>
                  <Led active={lfoActive} color="primary" />
                  <span className="ml-2">{lfoActive ? 'On' : 'Off'}</span>
                </Button>
              </div>
            </SynthModule>
         </div>
        <SynthModule title="Envelope (ADSR)">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <ControlGroup label="Attack">
              <Slider defaultValue={[10]} max={100} step={1} orientation="vertical" className="h-24 mx-auto" />
            </ControlGroup>
            <ControlGroup label="Decay">
              <Slider defaultValue={[30]} max={100} step={1} orientation="vertical" className="h-24 mx-auto" />
            </ControlGroup>
            <ControlGroup label="Sustain">
              <Slider defaultValue={[80]} max={100} step={1} orientation="vertical" className="h-24 mx-auto" />
            </ControlGroup>
            <ControlGroup label="Release">
              <Slider defaultValue={[40]} max={100} step={1} orientation="vertical" className="h-24 mx-auto" />
            </ControlGroup>
          </div>
        </SynthModule>
      </div>
    </div>
  );
}
