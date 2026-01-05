# Open NSynth Super Integration Guide

This guide explains how to integrate [Open NSynth Super](https://github.com/googlecreativelab/open-nsynth-super) with your Polyphonic Blackbox project.

## What is Open NSynth Super?

Open NSynth Super is an experimental physical synthesizer developed by Google Creative Lab that uses neural audio synthesis (NSynth algorithm from Google Magenta) to create unique sounds by blending different audio sources. It features:

- **Neural Audio Synthesis**: Uses machine learning to blend sounds at the audio level (not just mixing)
- **Raspberry Pi-based**: Runs on Raspberry Pi with custom PCB
- **Touchscreen Interface**: Intuitive X/Y pad for sound morphing
- **MIDI Connectivity**: Standard 5-pin MIDI IN for external control
- **Audio Output**: 3.5mm stereo audio output
- **Open Source Hardware**: All schematics, firmware, and case designs are available

## Integration Options

There are several ways to integrate Open NSynth Super with your Polyphonic Blackbox project:

### 1. MIDI Controller Integration (Recommended)

Use your Blackbox as a MIDI controller to play the NSynth Super:

```
┌─────────────────────┐
│ Polyphonic Blackbox │
│   (STM32F429I)      │
│                     │
│  [MIDI OUT] ────────┼──> MIDI IN
└─────────────────────┘     ┌─────────────────────┐
                            │  Open NSynth Super  │
                            │   (Raspberry Pi)    │
                            │                     │
                            │  [AUDIO OUT] ───────┼──> Mixer/DAW
                            └─────────────────────┘
```

**Implementation:**
- Configure MIDI OUT on your STM32F429I (via USB MIDI or DIN connector)
- Connect to NSynth Super's MIDI IN (5-pin DIN)
- Send MIDI Note On/Off messages from your control surface
- Use NSynth Super as a sound module

**Benefits:**
- Leverage NSynth's unique neural synthesis for sound generation
- Keep your Blackbox as the control interface
- Combine analog-style controls with AI-generated timbres

### 2. Parallel Setup with DAW Integration

Run both devices independently, controlled by your DAW:

```
                    ┌─────────────────┐
                    │   DAW (Ableton, │
                    │   FL Studio,    │
                    │   etc.)         │
                    └────────┬────────┘
                             │
                   ┌─────────┴─────────┐
                   │                   │
              MIDI │                   │ MIDI
                   ▼                   ▼
    ┌─────────────────────┐  ┌─────────────────────┐
    │ Polyphonic Blackbox │  │  Open NSynth Super  │
    │   (STM32F429I)      │  │   (Raspberry Pi)    │
    │                     │  │                     │
    │  [AUDIO OUT] ───────┼──┤  [AUDIO OUT] ───────┼──> Mixer
    └─────────────────────┘  └─────────────────────┘
```

**Implementation:**
- Both devices receive MIDI from your DAW
- Use different MIDI channels for each device
- Layer sounds or use them on different tracks
- Mix audio outputs in your DAW or external mixer

**Benefits:**
- Maximum flexibility in sound design
- Can use both synth engines simultaneously
- Best for studio/production environment

### 3. Audio Processing Chain

Use NSynth Super to process audio from your Blackbox:

```
┌─────────────────────┐      ┌─────────────────────┐
│ Polyphonic Blackbox │      │  Open NSynth Super  │
│   (STM32F429I)      │      │   (Raspberry Pi)    │
│                     │      │                     │
│  [AUDIO OUT] ───────┼──────┤  [AUDIO IN] *       │
└─────────────────────┘      │                     │
                             │  [AUDIO OUT] ───────┼──> Output
                             └─────────────────────┘

* Requires modification or external audio interface
```

**Note:** Open NSynth Super doesn't have built-in audio input, but you could:
- Use a separate audio interface with the Raspberry Pi
- Sample your Blackbox sounds and load them into NSynth Super
- Use NSynth algorithm to pre-process samples

### 4. Web Interface Integration

Extend your Astro/React web interface to control NSynth Super:

**Implementation Ideas:**
- Create a new view in your Dashboard for NSynth Super control
- Communicate with NSynth Super's Raspberry Pi via network (OSC/WebSockets)
- Mirror NSynth Super's touchscreen interface in your web UI
- Control sound morphing parameters remotely

**Requirements:**
- Modify NSynth Super firmware to accept network commands
- Add network communication to the Raspberry Pi
- Create React components for NSynth control interface

## Hardware Setup

### Required Components

1. **Open NSynth Super Hardware:**
   - Raspberry Pi (included in NSynth Super)
   - Custom NSynth PCB
   - Touchscreen display
   - Encoders and buttons
   - Case/enclosure

2. **MIDI Connection:**
   - MIDI cable (5-pin DIN)
   - MIDI interface for your Blackbox (if not built-in)

3. **Audio Connection:**
   - 3.5mm audio cable
   - Audio interface or mixer

### Building Open NSynth Super

If you don't have an Open NSynth Super yet, you can build one:

1. **Get the Repository:**
   ```bash
   git clone https://github.com/googlecreativelab/open-nsynth-super
   ```

2. **Components to Order:**
   - Raspberry Pi 3 or 4
   - Custom PCB (order from PCB manufacturer using provided files)
   - Components listed in BOM (Bill of Materials)
   - Touchscreen (specific model in documentation)
   - Encoders and buttons

3. **Build Steps:**
   - Solder components to PCB
   - Flash Raspberry Pi with provided Linux image
   - Upload firmware to microcontroller
   - Assemble case (laser cut or 3D print from provided files)
   - Load sample sets

4. **Resources:**
   - [Build Instructions](https://github.com/googlecreativelab/open-nsynth-super)
   - [Hackaday Project Page](https://hackaday.io/project/89396-open-nsynth-super)
   - Community forums for troubleshooting

## Software Integration

### MIDI Implementation

Add MIDI output to your STM32 firmware:

```c
// Example MIDI Note On message
void send_midi_note_on(uint8_t channel, uint8_t note, uint8_t velocity) {
    uint8_t midi_msg[3];
    midi_msg[0] = 0x90 | (channel & 0x0F);  // Note On + channel
    midi_msg[1] = note & 0x7F;               // Note number
    midi_msg[2] = velocity & 0x7F;           // Velocity
    
    // Send via UART/USB/DIN
    HAL_UART_Transmit(&huart_midi, midi_msg, 3, HAL_MAX_DELAY);
}
```

### Web Interface Extensions

Add a new view to your Dashboard for NSynth Super monitoring:

```tsx
// src/views/nsynth-view.tsx
'use client';

import * as React from 'react';
import { SynthModule } from '@/components/synth-module';
import { Badge } from '@/components/ui/badge';

export function NSynthView() {
  return (
    <div className="grid gap-4">
      <SynthModule title="NSynth Super Status">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Connection Status:</span>
            <Badge variant="default">Connected</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Current Preset:</span>
            <span className="text-sm font-mono">Bass + Strings</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">MIDI Channel:</span>
            <span className="text-sm font-mono">1</span>
          </div>
        </div>
      </SynthModule>
      
      <SynthModule title="Sound Morphing">
        <div className="aspect-square bg-card-foreground/5 rounded-lg flex items-center justify-center">
          <p className="text-sm text-muted-foreground">
            X/Y Pad Visualization
          </p>
        </div>
      </SynthModule>
    </div>
  );
}
```

## Workflow Examples

### Example 1: Live Performance Setup

```
1. Power on both devices
2. Connect MIDI cable from Blackbox OUT to NSynth Super IN
3. Connect NSynth Super audio to mixer/PA
4. Use Blackbox knobs and buttons to:
   - Trigger notes on NSynth Super
   - Control filter/envelope parameters
   - Switch between presets
5. Use NSynth Super touchscreen to:
   - Morph between sounds
   - Select sound sources
   - Adjust blend parameters
```

### Example 2: Studio Recording Setup

```
1. Connect both devices to DAW via USB MIDI
2. Route audio outputs to separate DAW tracks
3. Record MIDI performance from your Blackbox
4. Layer/blend sounds from both synths
5. Process and mix in DAW
6. Experiment with different NSynth sound combinations
```

### Example 3: Sound Design Workflow

```
1. Create sounds on your Blackbox synth
2. Record/export audio
3. Process through NSynth algorithm (on separate computer)
4. Load resulting sounds back into NSynth Super
5. Use as new sound sources for morphing
6. Control playback from your Blackbox interface
```

## Technical Specifications

### Open NSynth Super Specs

- **Platform:** Raspberry Pi 3 Model B
- **Audio:** 16-bit, 16kHz sample rate
- **Polyphony:** 4 voices
- **Storage:** microSD card for sample sets
- **MIDI:** 5-pin DIN input (receives MIDI notes)
- **Display:** Small OLED screen + touchscreen
- **Power:** 5V via micro-USB
- **Dimensions:** ~20cm x 20cm x 5cm (with standard case)

### Blackbox Specs (for reference)

- **Platform:** STM32F429I-DISCO
- **Audio:** CS43L22 audio codec, I2S
- **MIDI:** USB or DIN (to be implemented)
- **Display:** LCD touchscreen (on development board)
- **Controls:** Multiplexed potentiometers, buttons

## Troubleshooting

### MIDI Not Working

1. **Check MIDI cable orientation** - MIDI OUT (Blackbox) to MIDI IN (NSynth)
2. **Verify MIDI channel** - Both devices must use the same channel
3. **Test with different MIDI controller** - Verify NSynth Super MIDI input works
4. **Check firmware** - Ensure your STM32 MIDI implementation is correct

### No Audio Output

1. **Check audio cable connections**
2. **Verify NSynth Super is powered on**
3. **Check volume settings** on NSynth Super and receiving device
4. **Ensure sample set is loaded** on the SD card

### Latency Issues

1. **USB MIDI can have latency** - Consider hardware MIDI for lower latency
2. **Adjust buffer sizes** in DAW if using computer-based setup
3. **NSynth processing** - Neural synthesis has inherent processing time

## Resources

### Official Documentation

- [Open NSynth Super GitHub](https://github.com/googlecreativelab/open-nsynth-super)
- [NSynth Super Website](https://nsynthsuper.withgoogle.com/)
- [NSynth Algorithm (Magenta)](https://magenta.tensorflow.org/nsynth)
- [Build Instructions (Hackaday)](https://hackaday.io/project/89396-open-nsynth-super)

### Community Resources

- Google Magenta forums
- Raspberry Pi audio forums
- DIY synthesizer communities (Muffwiggler, Lines)

### Additional Tools

- **NSynth Algorithm** - Train custom models on your own sounds
- **Sample Processing** - Create new sound sets from your recordings
- **MIDI Utilities** - Monitor and debug MIDI communication

## Next Steps

1. **Decide on integration approach** - Choose the setup that fits your needs
2. **Acquire hardware** - Build or source Open NSynth Super
3. **Implement MIDI** - Add MIDI output to your STM32 firmware
4. **Test connectivity** - Verify MIDI and audio connections
5. **Develop workflow** - Create presets and performance setups
6. **Extend software** - Add web interface controls if desired

## Contributing

If you develop interesting integrations or workflows, consider:
- Sharing example code in this repository
- Writing blog posts or tutorials
- Contributing to the Open NSynth Super community
- Creating custom sample sets

---

**Note:** Open NSynth Super repository is archived, but the hardware and software remain fully functional and the community continues to build and use these devices.
