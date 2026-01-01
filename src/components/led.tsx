import { cn } from "@/lib/utils";

type LedProps = {
  active?: boolean;
  color?: "accent" | "primary" | "destructive";
  animated?: boolean;
};

export function Led({ active = false, color = "accent", animated = false }: LedProps) {
  const baseClasses = "h-2 w-2 rounded-full transition-all";
  const colorClasses = {
    accent: "bg-accent shadow-[0_0_8px_1px_hsl(var(--accent))]",
    primary: "bg-primary shadow-[0_0_8px_1px_hsl(var(--primary))]",
    destructive: "bg-destructive shadow-[0_0_8px_1px_hsl(var(--destructive))]",
  };
  const inactiveClasses = "bg-foreground/20";
  const animationClasses = animated ? "animate-led-blink" : "";

  return (
    <div
      className={cn(
        baseClasses,
        active ? colorClasses[color] : inactiveClasses,
        active && animated && animationClasses
      )}
    />
  );
}
