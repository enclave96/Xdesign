"use client";

import { useCallback, useRef, useState, type DragEvent } from "react";
import { DocumentUpload } from "iconsax-reactjs";
import { cn } from "@/lib/utils";
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
      <div
        className={cn(
          "group/drop cursor-pointer rounded-lg border-2 border-dashed bg-muted/30 p-8 transition-colors",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50 hover:bg-muted/50",
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

        <div className="flex flex-col items-center gap-5 py-6 text-center">
          <div
            aria-hidden
            className={cn(
              "flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform group-hover/drop:scale-105",
              isDragging && "scale-110"
            )}
          >
            <DocumentUpload {...iconProps(28, undefined, "Bold", { tone: "light", interactive: false })} />
          </div>

          <div>
            <p className="text-lg font-semibold text-foreground">
              {isDragging ? "Release to upload" : "Drop your design here"}
            </p>
            <p className="mt-1.5 text-sm text-muted-foreground">
              or click to browse — PNG, JPEG, WebP, GIF up to 20MB
            </p>
          </div>
        </div>
      </div>

      {error && (
        <p className="mt-3 text-center text-sm font-medium text-destructive">{error}</p>
      )}
    </div>
  );
}
