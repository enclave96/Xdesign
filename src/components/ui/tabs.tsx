"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";
import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = forwardRef<
  ElementRef<typeof TabsPrimitive.List>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex rounded-[var(--radius-xl)] border border-[var(--glass-border)]",
      "bg-[var(--glass-bg-subtle)] p-1.5 backdrop-blur-[var(--blur-md)] backdrop-saturate-150",
      "shadow-[var(--shadow-glass-sm)]",
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = forwardRef<
  ElementRef<typeof TabsPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "relative inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius-lg)]",
      "px-4 py-3 text-[var(--text-sm)] font-[var(--font-weight-semibold)]",
      "text-[var(--color-text-secondary)] outline-none transition-all duration-[var(--transition-smooth)]",
      "hover:bg-[var(--glass-bg-subtle)] hover:text-[var(--color-text-primary)]",
      "focus-visible:shadow-[var(--glow-focus)]",
      "data-[state=active]:border data-[state=active]:border-[var(--glass-border-strong)]",
      "data-[state=active]:bg-[var(--glass-bg-elevated)] data-[state=active]:text-[var(--color-text-primary)]",
      "data-[state=active]:shadow-[var(--shadow-glass-md)]",
      "disabled:pointer-events-none disabled:opacity-50",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = forwardRef<
  ElementRef<typeof TabsPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 outline-none data-[state=active]:animate-enter-up",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
