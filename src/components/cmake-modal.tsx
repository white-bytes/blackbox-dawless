"use client";

import { Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const cmakeCode = `cmake_minimum_required(VERSION 3.10)
project(PolyphonicBlackbox C CXX ASM)

# --- MCU Specifics ---
set(CPU "-mcpu=cortex-m4")
set(FPU "-mfpu=fpv4-sp-d16")
set(FLOAT_ABI "-mfloat-abi=hard")

add_definitions(-DSTM32F429xx)

# --- Source Files ---
file(GLOB_RECURSE SOURCES "src/*.c" "src/*.cpp")

# --- Include Directories ---
include_directories(
  "inc"
  "Drivers/CMSIS/Include"
  "Drivers/CMSIS/Device/ST/STM32F4xx/Include"
)

# --- Linker Script ---
set(CMAKE_EXE_LINKER_FLAGS
    "\${CMAKE_EXE_LINKER_FLAGS} -T STM32F429ZITx_FLASH.ld")

add_executable(\${PROJECT_NAME}.elf \${SOURCES})

# --- Final Output ---
add_custom_command(TARGET \${PROJECT_NAME}.elf POST_BUILD
  COMMAND \${CMAKE_OBJCOPY} -O ihex $<TARGET_FILE:\${PROJECT_NAME}.elf> \${PROJECT_NAME}.hex
  COMMAND \${CMAKE_OBJCOPY} -O binary $<TARGET_FILE:\${PROJECT_NAME}.elf> \${PROJECT_NAME}.bin
)
`;

export function CmakeModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Code className="h-5 w-5" />
          <span className="sr-only">View CMake Code</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>CMake Build Environment</DialogTitle>
          <DialogDescription>
            Example CMake configuration for the STM32F429I target, providing full control over the build process.
          </DialogDescription>
        </DialogHeader>
        <div className="rounded-md bg-card-foreground/5 p-4 max-h-[60vh] overflow-y-auto">
          <pre>
            <code className="font-code text-sm text-foreground/80">
              {cmakeCode}
            </code>
          </pre>
        </div>
      </DialogContent>
    </Dialog>
  );
}
