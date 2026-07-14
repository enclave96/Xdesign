"use client";

import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export interface InputGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const InputGroup = forwardRef<HTMLInputElement, InputGroupProps>(
  ({ className, leftIcon, rightIcon, ...props }, ref) => {
    if (!leftIcon && !rightIcon) {
      return <Input ref={ref} className={className} {...props} />;
    }

    return (
      <div className={cn("relative", className)}>
        {leftIcon && (
          <span className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-muted-foreground">
            {leftIcon}
          </span>
        )}
        <Input
          ref={ref}
          className={cn(leftIcon && "pl-10", rightIcon && "pr-10")}
          {...props}
        />
        {rightIcon && (
          <span className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-muted-foreground">
            {rightIcon}
          </span>
        )}
      </div>
    );
  }
);

InputGroup.displayName = "InputGroup";
