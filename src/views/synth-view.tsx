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
import { Knob } from '@/components/knob';

export function SynthView() {
  const [lfoActive, setLfoActive] = React.useState(true);
  const [osc2Active, setOsc2Active] = React.useState(true);
  
  // State for knobs
  const [osc1Coarse, setOsc1Coarse] = React.useState(0);
  const [osc1Fine, setOsc1Fine] = React.useState(50);
  const [osc2Coarse, setOsc2Coarse] = React.useState(12);
  const [mix, setMix] = React.useState(40);
  const [volume, setVolume] = React.useState(75);
  const [cutoff, setCutoff] = React.useState(60);
  const [resonance, setResonance] = React.useState(25);
  const [lfoRate, setLfoRate] = React.useState(30);
  const [modMix, setModMix] = React.useState(50);

  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-4 xl:grid-cols-5">
      <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 xl:col-span-3">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
          <SynthModule title="Oscillator 1">
            <div className="grid grid-cols-2 gap-4">
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
              <ControlGroup label="Coarse">
                <Knob value={osc1Coarse} onValueChange={setOsc1Coarse} min={-24} max={24} step={1} />
              </ControlGroup>
              <ControlGroup label="Fine">
                <Knob value={osc1Fine} onValueChange={setOsc1Fine} />
              </ControlGroup>
            </div>
          </SynthModule>
          <SynthModule title="Oscillator 2">
            <div className="grid grid-cols-2 gap-4">
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
               <ControlGroup label="Coarse">
                <Knob value={osc2Coarse} onValueChange={setOsc2Coarse} min={-24} max={24} step={1} />
              </ControlGroup>
               <Button variant={osc2Active ? 'secondary' : 'outline'} size="sm" onClick={() => setOsc2Active(!osc2Active)} className="col-span-2">
                <Led active={osc2Active} color="primary" />
                <span className="ml-2">{osc2Active ? 'On' : 'Off'}</span>
              </Button>
            </div>
          </SynthModule>
          <SynthModule title="Mixer">
             <div className="grid grid-cols-2 gap-4">
              <ControlGroup label="Osc Mix">
                <Knob value={mix} onValueChange={setMix} />
              </ControlGroup>
              <ControlGroup label="Volume">
                <Knob value={volume} onValueChange={setVolume} />
              </ControlGroup>
               <div className="flex items-center gap-4 pt-2 col-span-2">
                 <Led active={true} animated={true} />
                 <span className="text-sm text-muted-foreground">MIDI In</span>
              </div>
            </div>
          </SynthModule>
        </div>
      </div>

      <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 xl:col-span-2">
         <div className="grid gap-4 sm:grid-cols-2">
            <SynthModule title="Filter">
              <div className="grid grid-cols-2 gap-4">
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
                  <Knob value={cutoff} onValueChange={setCutoff} />
                </ControlGroup>
                <ControlGroup label="Resonance">
                   <Knob value={resonance} onValueChange={setResonance} />
                </ControlGroup>
              </div>
            </SynthModule>
            <SynthModule title="Modulation">
              <div className="grid grid-cols-2 gap-4">
                <ControlGroup label="LFO Wave">
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
                <ControlGroup label="LFO Rate">
                  <Knob value={lfoRate} onValueChange={setLfoRate} />
                </ControlGroup>
                <ControlGroup label="Mod Mix">
                  <Knob value={modMix} onValueChange={setModMix} />
                </ControlGroup>
                <Button variant={lfoActive ? 'secondary' : 'outline'} size="sm" onClick={() => setLfoActive(!lfoActive)}>
                  <Led active={lfoActive} color="primary" />
                  <span className="ml-2">{lfoActive ? 'LFO On' : 'LFO Off'}</span>
                </Button>
              </div>
            </SynthModule>
         </div>
        <SynthModule title="Envelope Generator">
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
