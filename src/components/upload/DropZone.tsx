"use client";

import { useCallback, useRef, useState, type DragEvent } from "react";
import { cn } from "@/lib/utils";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { validateFile } from "@/lib/api";

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
        className={cn(
          "cursor-pointer border-2 border-dashed transition-all duration-[var(--transition-base)]",
          isDragging
            ? "border-[var(--color-purple-400)] bg-[var(--glass-bg-strong)]"
            : "border-[var(--glass-border)] hover:border-[var(--color-blue-300)]",
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

        <div className="flex flex-col items-center gap-4 py-8 text-center">
          <div
            aria-hidden
            className="flex h-16 w-16 items-center justify-center rounded-[var(--radius-lg)] bg-[var(--gradient-accent)] shadow-[var(--shadow-glass-md)]"
          >
            <svg
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
          </div>

          <div>
            <p className="text-[var(--text-lg)] font-[var(--font-weight-semibold)] text-[var(--color-text-primary)]">
              Drop your design here
            </p>
            <p className="mt-1 text-[var(--text-sm)] text-[var(--color-text-secondary)]">
              or click to browse — PNG, JPEG, WebP, GIF up to 20MB
            </p>
          </div>
        </div>
      </GlassPanel>

      {error && (
        <p className="mt-3 text-center text-[var(--text-sm)] text-[var(--color-severity-critical)]">
          {error}
        </p>
      )}
    </div>
  );
}
