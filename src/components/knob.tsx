"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface KnobProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number // 0-100
  size?: number
  min?: number
  max?: number
  step?: number
  onValueChange?: (value: number) => void
}

export const Knob = React.forwardRef<HTMLDivElement, KnobProps>(
  ({ value, onValueChange, size = 60, min = 0, max = 100, step = 1, className, ...props }, ref) => {
    const [isDragging, setIsDragging] = React.useState(false)
    const knobRef = React.useRef<HTMLDivElement>(null)

    const handleInteraction = (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault()
      const knob = knobRef.current
      if (!knob) return

      const rect = knob.getBoundingClientRect()
      const centerY = rect.top + rect.height / 2

      const moveHandler = (moveEvent: MouseEvent | TouchEvent) => {
        let currentY;
        if ("touches" in moveEvent) {
          currentY = moveEvent.touches[0].clientY
        } else {
          currentY = moveEvent.clientY
        }
        
        const deltaY = centerY - currentY;
        const newValue = Math.round(value + deltaY * (step / 2));
        const clampedValue = Math.max(min, Math.min(max, newValue));
        
        if (onValueChange) {
          onValueChange(clampedValue)
        }
      }

      const endHandler = () => {
        setIsDragging(false)
        document.removeEventListener("mousemove", moveHandler as any)
        document.removeEventListener("touchmove", moveHandler as any)
        document.removeEventListener("mouseup", endHandler)
        document.removeEventListener("touchend", endHandler)
      }

      setIsDragging(true)
      document.addEventListener("mousemove", moveHandler as any)
      document.addEventListener("touchmove", moveHandler as any)
      document.addEventListener("mouseup", endHandler)
      document.addEventListener("touchend", endHandler)
    }

    const rotation = ((value - min) / (max - min)) * 270 - 135

    return (
      <div
        ref={knobRef}
        className={cn("relative flex-center cursor-pointer select-none", className)}
        style={{ width: size, height: size }}
        onMouseDown={handleInteraction}
        onTouchStart={handleInteraction}
        {...props}
      >
        <div
          className="relative w-full h-full rounded-full bg-card-foreground/90 shadow-inner"
          style={{
            transform: `rotate(${rotation}deg)`,
          }}
        >
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-primary rounded-full"></div>
          <div className="absolute inset-2 rounded-full bg-card shadow-md"></div>
        </div>
      </div>
    )
  }
)
Knob.displayName = "Knob"
