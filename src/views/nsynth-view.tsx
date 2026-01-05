'use client';

import * as React from 'react';
import { Waves, Power, Wifi } from 'lucide-react';
import { SynthModule } from '@/components/synth-module';
import { ControlGroup } from '@/components/control-group';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Led } from '@/components/led';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function NSynthView() {
  const [isConnected, setIsConnected] = React.useState(false);
  const [midiChannel, setMidiChannel] = React.useState('1');
  const [currentPreset, setCurrentPreset] = React.useState('bass-strings');

  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-3">
      {/* Status and Connection */}
      <SynthModule title="NSynth Super Status" className="lg:col-span-1">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Connection:</span>
            <div className="flex items-center gap-2">
              <Led active={isConnected} color="primary" />
              <Badge variant={isConnected ? 'default' : 'outline'}>
                {isConnected ? 'Connected' : 'Disconnected'}
              </Badge>
            </div>
          </div>
          <Separator />
          <ControlGroup label="MIDI Channel">
            <Select value={midiChannel} onValueChange={setMidiChannel}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[...Array(16)].map((_, i) => (
                  <SelectItem key={i + 1} value={String(i + 1)}>
                    Channel {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </ControlGroup>
          <ControlGroup label="Current Preset">
            <Select value={currentPreset} onValueChange={setCurrentPreset}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bass-strings">Bass + Strings</SelectItem>
                <SelectItem value="piano-synth">Piano + Synth</SelectItem>
                <SelectItem value="guitar-flute">Guitar + Flute</SelectItem>
                <SelectItem value="brass-pad">Brass + Pad</SelectItem>
                <SelectItem value="vocal-bells">Vocal + Bells</SelectItem>
              </SelectContent>
            </Select>
          </ControlGroup>
          <div className="pt-4 space-y-2">
            <Button 
              variant={isConnected ? 'default' : 'secondary'} 
              className="w-full"
              onClick={() => setIsConnected(!isConnected)}
            >
              <Wifi className="h-4 w-4 mr-2" />
              {isConnected ? 'Disconnect' : 'Connect'}
            </Button>
            <Button variant="outline" className="w-full">
              <Power className="h-4 w-4 mr-2" />
              Power Status
            </Button>
          </div>
        </div>
      </SynthModule>

      {/* Sound Morphing Visualization */}
      <SynthModule title="Neural Sound Morphing" className="lg:col-span-2">
        <div className="space-y-4">
          <div className="aspect-video bg-gradient-to-br from-primary/20 via-accent/20 to-primary/10 rounded-lg flex items-center justify-center border-2 border-primary/20 relative overflow-hidden">
            {/* X/Y Pad visualization */}
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1 p-4">
              <div className="bg-card-foreground/5 rounded-lg flex flex-col items-center justify-center p-4 border border-card-foreground/10">
                <Waves className="h-8 w-8 mb-2 text-primary" />
                <span className="text-xs font-medium">Source A</span>
                <span className="text-xs text-muted-foreground">Bass</span>
              </div>
              <div className="bg-card-foreground/5 rounded-lg flex flex-col items-center justify-center p-4 border border-card-foreground/10">
                <Waves className="h-8 w-8 mb-2 text-accent" />
                <span className="text-xs font-medium">Source B</span>
                <span className="text-xs text-muted-foreground">Strings</span>
              </div>
              <div className="bg-card-foreground/5 rounded-lg flex flex-col items-center justify-center p-4 border border-card-foreground/10">
                <Waves className="h-8 w-8 mb-2 text-secondary" />
                <span className="text-xs font-medium">Source C</span>
                <span className="text-xs text-muted-foreground">Synth</span>
              </div>
              <div className="bg-card-foreground/5 rounded-lg flex flex-col items-center justify-center p-4 border border-card-foreground/10">
                <Waves className="h-8 w-8 mb-2 text-primary/60" />
                <span className="text-xs font-medium">Source D</span>
                <span className="text-xs text-muted-foreground">Pad</span>
              </div>
            </div>
            
            {/* Center morphing indicator */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-12 h-12 rounded-full bg-primary/80 border-4 border-background shadow-lg flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-background animate-pulse" />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">Blend X</div>
              <div className="text-sm font-mono">50%</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">Blend Y</div>
              <div className="text-sm font-mono">50%</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">Voices</div>
              <div className="text-sm font-mono">4 / 4</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground">Sample Rate</div>
              <div className="text-sm font-mono">16kHz</div>
            </div>
          </div>
        </div>
      </SynthModule>

      {/* Info and Documentation */}
      <SynthModule title="About NSynth Super" className="lg:col-span-3">
        <div className="space-y-3 text-sm">
          <p className="text-muted-foreground">
            Open NSynth Super is an experimental physical synthesizer that uses neural audio 
            synthesis to create new sounds by blending existing ones. Unlike traditional 
            mixing or crossfading, NSynth uses machine learning to generate entirely new 
            timbres at the audio level.
          </p>
          <Separator />
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Integration Features:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• MIDI control from Blackbox</li>
                <li>• Neural audio synthesis</li>
                <li>• 4-voice polyphony</li>
                <li>• Real-time sound morphing</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Quick Links:</h4>
              <ul className="space-y-1">
                <li>
                  <a 
                    href="/docs/open-nsynth-super-integration.md" 
                    className="text-primary hover:underline"
                    target="_blank"
                  >
                    → Integration Guide
                  </a>
                </li>
                <li>
                  <a 
                    href="https://github.com/googlecreativelab/open-nsynth-super" 
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    → GitHub Repository
                  </a>
                </li>
                <li>
                  <a 
                    href="https://nsynthsuper.withgoogle.com" 
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    → Official Website
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </SynthModule>
    </div>
  );
}
