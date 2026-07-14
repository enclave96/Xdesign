import type {
  AnalysisStatus,
  CategoryScores,
  IssueCategory,
  IssueSeverity,
  AnalysisReport,
} from "@/lib/analysis/types";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  createdAt: string;
}

export interface ProjectSummary {
  id: string;
  name: string;
  sourceType: string;
  sourceUrl: string | null;
  filePath: string | null;
  thumbnailPath: string | null;
  createdAt: string;
  analyses: AnalysisSummary[];
}

export interface AnalysisSummary {
  id: string;
  status: AnalysisStatus;
  overallScore: number | null;
  createdAt: string;
  completedAt: string | null;
}

export interface IssueRecord {
  id: string;
  analysisId: string;
  category: IssueCategory;
  severity: IssueSeverity;
  title: string;
  description: string;
  recommendation: string;
  x: number | null;
  y: number | null;
  width: number | null;
  height: number | null;
}

export interface AnalysisDetail {
  id: string;
  projectId: string;
  status: AnalysisStatus;
  overallScore: number | null;
  scores: (CategoryScores & { overall?: number }) | null;
  report: AnalysisReport | null;
  createdAt: string;
  completedAt: string | null;
  issues: IssueRecord[];
  project: {
    id: string;
    name: string;
    sourceType: string;
  };
}

export interface ProjectDetail {
  id: string;
  name: string;
  sourceType: string;
  sourceUrl: string | null;
  filePath: string | null;
  thumbnailPath: string | null;
  createdAt: string;
  latestAnalysis: AnalysisDetail | null;
}

type JsonBody = Record<string, unknown>;

async function parseResponse<T>(res: Response): Promise<T> {
  const contentType = res.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");

  if (!res.ok) {
    if (isJson) {
      const data = (await res.json()) as { error?: string };
      throw new ApiError(data.error ?? "Request failed", res.status);
    }
    throw new ApiError(res.statusText || "Request failed", res.status);
  }

  if (isJson) {
    return res.json() as Promise<T>;
  }

  return res as unknown as T;
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(path, {
    ...options,
    credentials: "include",
    headers: {
      ...(options.body instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
      ...options.headers,
    },
  });

  return parseResponse<T>(res);
}

export function getAssetUrl(relativePath: string | null | undefined): string | null {
  if (!relativePath) return null;
  const segments = relativePath.split(/[/\\]/).map(encodeURIComponent);
  return `/api/uploads/${segments.join("/")}`;
}

export const api = {
  auth: {
    me: () => request<{ user: User }>("/api/auth/me"),
    login: (email: string, password: string) =>
      request<{ user: User }>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }),
    register: (email: string, password: string, name?: string) =>
      request<{ user: User }>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, password, name }),
      }),
    logout: () =>
      request<{ success: boolean }>("/api/auth/logout", { method: "POST" }),
  },

  projects: {
    list: () => request<{ projects: ProjectSummary[] }>("/api/projects"),
    get: (id: string) =>
      request<{ project: ProjectDetail }>(`/api/projects/${id}`),
    delete: (id: string) =>
      request<{ success: boolean }>(`/api/projects/${id}`, {
        method: "DELETE",
      }),
    createFromFile: (
      name: string,
      file: File,
      sourceType = "upload",
      onProgress?: (progress: number) => void
    ) => {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("file", file);
      formData.append("sourceType", sourceType);

      if (!onProgress) {
        return request<{ project: ProjectSummary }>("/api/projects", {
          method: "POST",
          body: formData,
        });
      }

      return new Promise<{ project: ProjectSummary }>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/projects");
        xhr.withCredentials = true;

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            onProgress(Math.round((event.loaded / event.total) * 100));
          }
        };

        xhr.onload = () => {
          try {
            const data = JSON.parse(xhr.responseText) as {
              project?: ProjectSummary;
              error?: string;
            };
            if (xhr.status >= 200 && xhr.status < 300 && data.project) {
              resolve({ project: data.project });
            } else {
              reject(new ApiError(data.error ?? "Upload failed", xhr.status));
            }
          } catch {
            reject(new ApiError("Upload failed", xhr.status));
          }
        };

        xhr.onerror = () => reject(new ApiError("Network error", 0));
        xhr.send(formData);
      });
    },
    createFromUrl: (name: string, url: string, sourceType: "url" | "figma") =>
      request<{ project: ProjectSummary }>("/api/projects", {
        method: "POST",
        body: JSON.stringify({ name, url, sourceType } satisfies JsonBody),
      }),
    analyze: (id: string) =>
      request<{ analysis: AnalysisSummary; message?: string }>(
        `/api/projects/${id}/analyze`,
        { method: "POST" }
      ),
  },

  analyses: {
    get: (id: string) =>
      request<{ analysis: AnalysisDetail }>(`/api/analyses/${id}`),
    reportUrl: (id: string) => `/api/analyses/${id}/report`,
  },
};

export const ACCEPTED_FILE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/gif",
] as const;

export const ACCEPTED_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp", ".gif"];

export const MAX_FILE_SIZE = 20 * 1024 * 1024;

export function validateFile(file: File): string | null {
  if (!ACCEPTED_FILE_TYPES.includes(file.type as (typeof ACCEPTED_FILE_TYPES)[number])) {
    const ext = file.name.toLowerCase().slice(file.name.lastIndexOf("."));
    if (!ACCEPTED_EXTENSIONS.includes(ext)) {
      return "Please upload a PNG, JPEG, WebP, or GIF image.";
    }
  }
  if (file.size > MAX_FILE_SIZE) {
    return "File is too large. Maximum size is 20MB.";
  }
  return null;
}

export const CATEGORY_LABELS: Record<IssueCategory, string> = {
  "color-contrast": "Color Contrast",
  typography: "Typography",
  "touch-target": "Touch Targets",
  "visual-hierarchy": "Visual Hierarchy",
  navigation: "Navigation",
  readability: "Readability",
  consistency: "Consistency",
  interaction: "Interaction",
  wcag: "WCAG",
  layout: "Layout",
};

export const SCORE_CATEGORY_LABELS: Record<keyof CategoryScores, string> = {
  visualHierarchy: "Visual Hierarchy",
  navigationClarity: "Navigation",
  readability: "Readability",
  consistency: "Consistency",
  interactionClarity: "Interaction",
  wcagCompliance: "WCAG",
  typography: "Typography",
  touchTargets: "Touch Targets",
};
