import * as React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface ControlGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
}

export function ControlGroup({ label, children, className }: ControlGroupProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Label className="text-sm font-medium text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
