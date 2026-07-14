"use client";

import { useCallback, useRef, useState, type DragEvent } from "react";
import { DocumentUpload } from "iconsax-reactjs";
import { cn } from "@/lib/utils";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { validateFile } from "@/lib/api";
import { iconProps } from "@/components/icons";

export interface DropZoneProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
  className?: string;
}

export function DropZone({ onFileSelect, disabled, className }: DropZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback(
    (file: File) => {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }
      setError(null);
      onFileSelect(file);
    },
    [onFileSelect]
  );

  const handleDragOver = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      if (!disabled) setIsDragging(true);
    },
    [disabled]
  );

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (disabled) return;

      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [disabled, handleFile]
  );

  return (
    <div className={className}>
      <GlassPanel
        variant={isDragging ? "strong" : "subtle"}
        padding="lg"
        shine
        className={cn(
          "group/drop cursor-pointer border-2 border-dashed",
          "transition-all duration-[var(--transition-liquid)]",
          isDragging
            ? "scale-[1.01] border-[var(--color-purple-400)] bg-[var(--glass-bg-strong)] shadow-[var(--glow-focus-input)]"
            : "border-[var(--glass-border)] hover:border-[var(--color-blue-300)] hover:bg-[var(--glass-bg)] hover:shadow-[var(--shadow-glass-md)]",
          disabled && "pointer-events-none opacity-50"
        )}
        onClick={() => !disabled && inputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          className="hidden"
          disabled={disabled}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = "";
          }}
        />

        <div className="flex flex-col items-center gap-5 py-10 text-center">
          <div
            aria-hidden
            className={cn(
              "relative flex h-[4.5rem] w-[4.5rem] items-center justify-center",
              "rounded-[var(--radius-xl)] bg-[var(--gradient-accent)]",
              "shadow-[var(--glow-button)]",
              "transition-all duration-[var(--transition-smooth)]",
              "group-hover/drop:scale-105 group-hover/drop:shadow-[var(--glow-button-hover)]",
              isDragging && "scale-110 animate-glass-pulse"
            )}
          >
            <div className="absolute inset-x-0 top-0 h-1/2 rounded-t-[var(--radius-xl)] bg-gradient-to-b from-white/35 to-transparent" />
            <DocumentUpload {...iconProps(28, "relative", "Bold", { tone: "light", interactive: false })} />
          </div>

          <div>
            <p className="text-[var(--text-lg)] font-[var(--font-weight-semibold)] text-[var(--color-text-primary)]">
              {isDragging ? "Release to upload" : "Drop your design here"}
            </p>
            <p className="mt-1.5 text-[var(--text-sm)] text-[var(--color-text-secondary)]">
              or click to browse — PNG, JPEG, WebP, GIF up to 20MB
            </p>
          </div>
        </div>
      </GlassPanel>

      {error && (
        <p className="mt-3 text-center text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[var(--color-severity-critical)]">
          {error}
        </p>
      )}
    </div>
  );
}
