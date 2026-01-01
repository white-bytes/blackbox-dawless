import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SynthModuleProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

export const SynthModule = React.forwardRef<HTMLDivElement, SynthModuleProps>(
  ({ title, children, className, ...props }, ref) => {
    return (
      <Card className={cn("flex flex-col", className)} {...props} ref={ref}>
        <CardHeader className="flex-row items-center justify-between space-y-0 py-3 px-4 border-b">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          {children}
        </CardContent>
      </Card>
    );
  }
);
SynthModule.displayName = "SynthModule";
