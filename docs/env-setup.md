LaunchMoog: Full Stack Setup Guide
This guide covers the setup for both the Virtual Prototype (Frontend) and the STM32 Firmware (Hardware Backend).
System Context: Pop!_OS (ARM64) VM on macOS M1 Host (VMware Fusion).
Part 1: Frontend Setup (The Virtual Prototype)
The "Frontend" is the React application (launch_moog_synth.jsx) that simulates the synthesizer.
1. Prerequisites (Pop!_OS)
On Pop!_OS, it is best to install Node.js using the package manager. Open your terminal:
# Update package lists
sudo apt update

# Install Node.js and npm
sudo apt install nodejs npm

# Verify installation (Ensure version is v18 or higher)
node -v


2. Scaffolding the Project
# 1. Start the server
npm run dev


Open http://localhost:5173 in Firefox (installed by default on Pop!_OS).
Part 2: Backend Setup (The STM32 Firmware)
Since your VM matches the host architecture (ARM64), standard repositories work well, but you must be careful with USB connectivity.
1. Install the ARM Toolchain (Pop!_OS / Ubuntu)
You can install the cross-compiler directly from the Pop!_OS repositories. This is much easier than downloading manual binaries.
sudo apt update
sudo apt install gcc-arm-none-eabi build-essential


Verification:
arm-none-eabi-gcc --version


It should report a version (likely 10.x or 12.x depending on your Pop!_OS version).
2. Install Build Tools
Install CMake and Ninja using apt:
sudo apt install cmake ninja-build


3. Install the Debugger (OpenOCD)
OpenOCD allows VS Code to talk to the ST-Link on your board.
sudo apt install openocd


4. VS Code Configuration
Install VS Code: Download the Linux .deb (ARM64) version from the official VS Code website, or install via the Pop!_Shop.
Extensions: Install the C/C++, CMake Tools, and Cortex-Debug extensions inside VS Code.
Project Setup:
Open your firmware folder in VS Code.
When CMake asks for a kit, select GCC for arm-none-eabi.
5. Special Note: USB Connectivity (VMware on M1)
This is the trickiest part of your setup.
Connect the Board: Plug the STM32F429I-DISCO into your Mac.
VMware Prompt: VMware Fusion should ask if you want to connect the USB device to the Mac or the Linux VM. Choose Linux.
Verify in Linux:
Run lsusb in your Pop!_OS terminal. You should see something like STMicroelectronics ST-LINK/V2.
If you don't see it, you cannot flash the board.
6. Building and Flashing
Build: Ctrl+Shift+P -> CMake: Build.
Flash: Go to Run and Debug -> Select "Debug (OpenOCD)" -> Press F5.
