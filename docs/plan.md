# Hardware Prototyping Plan

This plan outlines the steps to move from concept to a functional hardware prototype for the Polyphonic Blackbox.

## Phase 1: Procurement & Setup
Before writing code, ensure you have the necessary components.

### Core
- [ ] **STM32F429I-DISCO Development Board**: The brain of the operation.
- [ ] **Breadboard & Jumper Wires**: For temporary connections.

### Controls (Inputs)
- [ ] **Potentiometers (10kΩ Linear Taper)**: At least 4-8 to test multiplexing.
- [ ] **Push Buttons (Momentary)**: Tactile switches for triggers/menu.
- [ ] **Multiplexer (CD74HC4067 or 74HC4051)**: To connect many knobs to limited ADC pins.
- [ ] **Encoder (Optional)**: A rotary encoder with push-button for main data entry.

### Audio/MIDI (Outputs)
- [ ] **3.5mm Stereo Audio Jack**: If not using the board's built-in jack during early tests.
- [ ] **MIDI DIN/TRS Connector**: For standard MIDI Output.
- [ ] **Optocoupler (6N138)**: Required if you plan to receive MIDI IN via DIN.

---

## Phase 2: Incremental Prototyping Steps

### Step 1: "Hello World" (Blink & Serial)
- **Goal**: Verify toolchain and board health.
- **Action**: 
    1.  Blink the on-board LED.
    2.  Send "Hello World" via UART to your computer (view with `screen` or `putty`).
    3.  *Why*: Ensures your IDE, debugger, and basic drivers are working.

### Step 2: Analog Inputs (The Knobs)
- **Goal**: Read values from potentiometers.
- **Action**:
    1.  Connect one potentiometer to an ADC pin (e.g., PA0).
    2.  Read the raw 0-4095 value.
    3.  Print the value to UART.
    4.  **Advanced**: Wire up the CD74HC4067 Mux. Write a function to cycle through channels and read 16 pots from one pin.

### Step 3: Audio Output (The Sound)
- **Goal**: Generate a sound wave.
- **Action**:
    1.  Configure the **CS43L22** audio codec on the DISCO board (via I2C control + I2S data).
    2.  Fill the DMA buffer with a simple Sine Wave lookup table.
    3.  Verify you hear a tone from the board's headphone jack.

### Step 4: The Bridge (Input -> Sound)
- **Goal**: Change pitch with a knob.
- **Action**:
    1.  Map the ADC value from Step 2 to the frequency of the Sine Wave in Step 3.
    2.  Observe the pitch changing as you turn the knob.

### Step 5: MIDI Integration
- **Goal**: Talk to the DAW.
- **Action**:
    1.  Configure the USB OTG peripheral as a MIDI Device.
    2.  Send a "Note On" message when a button is pressed.
    3.  Receive MIDI notes from the computer and play the sine wave.

---

## Phase 3: Enclosure & PCB (Future)
Once the breadboard mess works:
1.  Design a "Control PCB" or "Shield" that plugs into the DISCO board headers.
2.  Laser cut or 3D print a case with the "Wood Panels" aesthetic.
