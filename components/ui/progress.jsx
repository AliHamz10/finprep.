"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

function Progress({ className, value, extraStyles, ...props }) {
  // Ensure value is not negative and handle edge cases
  const cappedValue = Math.max(0, value || 0);

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={`h-full transition-all ${
          cappedValue > 100 ? "bg-red-700" : "bg-primary"
        } ${extraStyles}`}
        style={{
          width: `${Math.min(cappedValue, 100)}%`, // Cap width at 100%
        }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
