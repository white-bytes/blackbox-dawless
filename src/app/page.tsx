'use client';

import * as React from 'react';
import { Cpu, Code, Github } from 'lucide-react';
import { useState } from 'react';

import { Logo } from '@/components/logo';
import { StatusIndicators } from '@/components/status-indicators';
import { CmakeModal } from '@/components/cmake-modal';
import { SynthView } from '@/views/synth-view';
import { DawView } from '@/views/daw-view';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Mode = 'synth' | 'daw';

export default function DashboardPage() {
  const [mode, setMode] = useState<Mode>('synth');

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-6">
        <div className="flex items-center gap-3">
          <Logo />
          <h1 className="text-lg font-semibold md:text-xl">Polyphonic Blackbox</h1>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <Tabs value={mode} onValueChange={(value) => setMode(value as Mode)} className="mx-auto">
            <TabsList>
              <TabsTrigger value="synth">Synth Engine</TabsTrigger>
              <TabsTrigger value="daw">DAW Controller</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="flex items-center gap-4">
          <StatusIndicators />
          <Separator orientation="vertical" className="h-6" />
          <CmakeModal />
          <Button variant="ghost" size="icon" asChild>
            <a href="https://github.com/firebase/studio" target="_blank" rel="noreferrer">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
          </Button>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {mode === 'synth' ? <SynthView /> : <DawView />}
      </main>
    </div>
  );
}
