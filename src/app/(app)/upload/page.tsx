"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Link2, Sparkles } from "lucide-react";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlassInput } from "@/components/ui/GlassInput";
import { GlassField } from "@/components/ui/GlassField";
import { GlassAlert } from "@/components/ui/GlassAlert";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { DropZone } from "@/components/upload/DropZone";
import { UploadTabs, type UploadTab } from "@/components/upload/UploadTabs";
import { api } from "@/lib/api";
import { getAuthErrorMessage } from "@/hooks/useAuth";

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

    const projectName =
      name.trim() || (selectedFile?.name.replace(/\.[^.]+$/, "") ?? "Untitled Project");

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
        <h1 className="text-[var(--text-2xl)] font-[var(--font-weight-bold)] tracking-tight">
          Upload Design
        </h1>
        <p className="mt-1.5 text-[var(--color-text-secondary)]">
          Choose how you want to import your design for analysis
        </p>
      </div>

      <UploadTabs activeTab={activeTab} onTabChange={setActiveTab} className="mb-6" />

      <GlassCard variant="elevated" className="mb-6">
        <GlassField label="Project name" htmlFor="project-name">
          <GlassInput
            id="project-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            placeholder="e.g. Homepage redesign v2"
          />
        </GlassField>

        <div className="mt-6">
          {activeTab === "file" ? (
            <>
              <DropZone onFileSelect={setSelectedFile} disabled={loading} />
              {selectedFile && (
                <div className="mt-4 rounded-[var(--radius-md)] border border-[var(--glass-border)] bg-[var(--glass-bg-subtle)] px-4 py-3 text-center backdrop-blur-[var(--blur-sm)]">
                  <p className="text-[var(--text-sm)] text-[var(--color-text-secondary)]">
                    Selected:{" "}
                    <strong className="font-[var(--font-weight-semibold)] text-[var(--color-text-primary)]">
                      {selectedFile.name}
                    </strong>{" "}
                    <span className="text-[var(--color-text-muted)]">
                      ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </p>
                </div>
              )}
            </>
          ) : (
            <GlassField
              label={activeTab === "figma" ? "Figma frame URL" : "Website URL"}
              htmlFor="source-url"
              hint={
                activeTab === "figma"
                  ? "Paste a public Figma file or frame link to capture a preview."
                  : "We'll capture a screenshot of the live website for analysis."
              }
            >
              <GlassInput
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
                leftIcon={<Link2 className="h-4 w-4" strokeWidth={1.75} />}
              />
            </GlassField>
          )}
        </div>
      </GlassCard>

      {error && <GlassAlert variant="error" className="mb-4">{error}</GlassAlert>}

      {loading && (
        <div className="mb-5">
          <ProgressBar value={progress} showLabel label="Uploading & starting analysis" />
        </div>
      )}

      <GlassButton
        variant="primary"
        size="lg"
        fullWidth
        loading={loading}
        onClick={handleSubmit}
        leftIcon={<Sparkles className="h-4 w-4" strokeWidth={1.75} />}
      >
        Analyze design
      </GlassButton>
    </div>
  );
}
