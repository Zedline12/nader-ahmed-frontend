"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SliderProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
> {
  value: number[];
  max?: number;
  step?: number;
  onValueChange: (value: number[]) => void;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, value, max = 100, step = 1, onValueChange, ...props }, ref) => {
    return (
      <input
        type="range"
        ref={ref}
        className={cn(
          "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700",
          className,
        )}
        min={0}
        max={max}
        step={step}
        value={value?.[0] ?? 0}
        onChange={(e) => onValueChange([parseFloat(e.target.value)])}
        {...props}
      />
    );
  },
);
Slider.displayName = "Slider";

export { Slider };
