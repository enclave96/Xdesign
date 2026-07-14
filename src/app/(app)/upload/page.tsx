"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { DropZone } from "@/components/upload/DropZone";
import { UploadTabs, type UploadTab } from "@/components/upload/UploadTabs";
import { api } from "@/lib/api";
import { getAuthErrorMessage } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

export default function UploadPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<UploadTab>("file");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    setError(null);

    const projectName = name.trim() || (selectedFile?.name.replace(/\.[^.]+$/, "") ?? "Untitled Project");

    setLoading(true);
    setProgress(0);

    try {
      let projectId: string;

      if (activeTab === "file") {
        if (!selectedFile) {
          setError("Please select a file to upload.");
          setLoading(false);
          return;
        }
        const { project } = await api.projects.createFromFile(
          projectName,
          selectedFile,
          "upload",
          setProgress
        );
        projectId = project.id;
      } else {
        if (!url.trim()) {
          setError("Please enter a URL.");
          setLoading(false);
          return;
        }
        setProgress(30);
        const { project } = await api.projects.createFromUrl(
          projectName,
          url.trim(),
          activeTab === "figma" ? "figma" : "url"
        );
        projectId = project.id;
        setProgress(70);
      }

      const { analysis } = await api.projects.analyze(projectId);
      setProgress(100);
      router.push(`/analysis/${analysis.id}`);
    } catch (err) {
      setError(getAuthErrorMessage(err));
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <h1 className="text-[var(--text-2xl)] font-[var(--font-weight-bold)]">
          Upload Design
        </h1>
        <p className="mt-1 text-[var(--color-text-secondary)]">
          Choose how you want to import your design for analysis
        </p>
      </div>

      <UploadTabs activeTab={activeTab} onTabChange={setActiveTab} className="mb-6" />

      <GlassCard className="mb-6">
        <div className="mb-4">
          <label
            htmlFor="project-name"
            className="mb-1.5 block text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[var(--color-text-primary)]"
          >
            Project name
          </label>
          <input
            id="project-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            placeholder="e.g. Homepage redesign v2"
            className={cn(
              "w-full rounded-[var(--radius-md)] border border-[var(--glass-border)]",
              "bg-[var(--glass-bg)] px-4 py-2.5 text-[var(--text-sm)]",
              "text-[var(--color-text-primary)] backdrop-blur-[var(--blur-sm)]",
              "focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-400)]",
              "disabled:opacity-50"
            )}
          />
        </div>

        {activeTab === "file" ? (
          <div>
            <DropZone
              onFileSelect={setSelectedFile}
              disabled={loading}
            />
            {selectedFile && (
              <p className="mt-3 text-center text-[var(--text-sm)] text-[var(--color-text-secondary)]">
                Selected: <strong>{selectedFile.name}</strong> (
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>
        ) : (
          <div>
            <label
              htmlFor="source-url"
              className="mb-1.5 block text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[var(--color-text-primary)]"
            >
              {activeTab === "figma" ? "Figma frame URL" : "Website URL"}
            </label>
            <input
              id="source-url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={loading}
              placeholder={
                activeTab === "figma"
                  ? "https://www.figma.com/file/..."
                  : "https://example.com"
              }
              className={cn(
                "w-full rounded-[var(--radius-md)] border border-[var(--glass-border)]",
                "bg-[var(--glass-bg)] px-4 py-2.5 text-[var(--text-sm)]",
                "text-[var(--color-text-primary)] backdrop-blur-[var(--blur-sm)]",
                "focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-400)]",
                "disabled:opacity-50"
              )}
            />
            <p className="mt-2 text-[var(--text-xs)] text-[var(--color-text-muted)]">
              {activeTab === "figma"
                ? "Paste a public Figma file or frame link to capture a preview."
                : "We'll capture a screenshot of the live website for analysis."}
            </p>
          </div>
        )}
      </GlassCard>

      {error && (
        <div
          role="alert"
          className="mb-4 rounded-[var(--radius-md)] border border-[var(--color-severity-critical-border)] bg-[var(--color-severity-critical-bg)] px-4 py-3 text-[var(--text-sm)] text-[var(--color-severity-critical)]"
        >
          {error}
        </div>
      )}

      {loading && (
        <div className="mb-4">
          <ProgressBar value={progress} showLabel label="Uploading & starting analysis" />
        </div>
      )}

      <GlassButton
        variant="primary"
        size="lg"
        fullWidth
        loading={loading}
        onClick={handleSubmit}
      >
        Analyze design
      </GlassButton>
    </div>
  );
}
