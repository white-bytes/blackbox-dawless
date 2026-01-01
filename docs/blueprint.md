# **App Name**: Polyphonic Blackbox

## Core Features:

- Multi-Voice Synthesis Engine: Develop a polyphonic virtual-analog synthesizer engine capable of producing multiple voices simultaneously on the STM32F429I.
- DAW + Synth Dual-Mode Operation: Implement a dual-mode system where the device functions both as a MIDI controller for a Digital Audio Workstation (DAW) and as a standalone synthesizer.
- Control Surface Integration: Integrate existing control surface components (knobs, buttons, mux, LEDs) for real-time manipulation of synth parameters.
- Optimized Memory Management: Implement efficient memory management techniques to accommodate multiple voices within the STM32F429I's RAM limitations.
- CMake Build Environment: Utilize a CMake-only, Cube-free workflow to maintain full control over interrupts, DMA, audio buffers, DSP pipelines, and memory layout.

## Style Guidelines:

- Primary color: Deep electric blue (#4169E1) to reflect the blending of digital precision with the warmth of analog sounds.
- Background color: Dark grey (#282828), a neutral backdrop that highlights the vibrancy of other elements and promotes focus.
- Accent color: Energetic orange (#FF8C00) for interactive elements and important indicators.
- Body and headline font: 'Inter', a grotesque-style sans-serif with a modern, machined, objective, neutral look.
- Code font: 'Source Code Pro' for displaying code snippets.
- Arrange controls in a clear, logical layout for intuitive operation and visual appeal.
- Subtle visual feedback (e.g., LED animations) to confirm user interactions and highlight parameter changes.