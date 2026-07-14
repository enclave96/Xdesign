import type { AnalysisIssue, AnalysisReport, CategoryScores } from './analysis/types';

export interface ReportData {
  projectName: string;
  analysisId: string;
  overallScore: number;
  scores: CategoryScores;
  issues: AnalysisIssue[];
  report: AnalysisReport;
  createdAt: Date;
  completedAt?: Date | null;
}

function severityColor(severity: string): string {
  const colors: Record<string, string> = {
    critical: '#dc2626',
    high: '#ea580c',
    medium: '#ca8a04',
    low: '#2563eb',
    info: '#6b7280',
  };
  return colors[severity] ?? '#6b7280';
}

function scoreColor(score: number): string {
  if (score >= 80) return '#16a34a';
  if (score >= 60) return '#ca8a04';
  return '#dc2626';
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderScoreBar(label: string, score: number): string {
  const color = scoreColor(score);
  return `
    <div class="score-row">
      <div class="score-label">${escapeHtml(label)}</div>
      <div class="score-bar-track">
        <div class="score-bar-fill" style="width:${score}%;background:${color}"></div>
      </div>
      <div class="score-value" style="color:${color}">${score}</div>
    </div>`;
}

export function generateHtmlReport(data: ReportData): string {
  const { projectName, analysisId, overallScore, scores, issues, report, createdAt, completedAt } =
    data;

  const scoreEntries: [string, number][] = [
    ['Visual Hierarchy', scores.visualHierarchy],
    ['Navigation Clarity', scores.navigationClarity],
    ['Readability', scores.readability],
    ['Consistency', scores.consistency],
    ['Interaction Clarity', scores.interactionClarity],
    ['WCAG Compliance', scores.wcagCompliance],
    ['Typography', scores.typography],
    ['Touch Targets', scores.touchTargets],
  ];

  const issuesHtml = issues
    .map(
      (issue) => `
      <div class="issue-card" data-severity="${issue.severity}">
        <div class="issue-header">
          <span class="severity-badge" style="background:${severityColor(issue.severity)}">${issue.severity.toUpperCase()}</span>
          <span class="issue-category">${escapeHtml(issue.category)}</span>
        </div>
        <h3>${escapeHtml(issue.title)}</h3>
        <p class="issue-desc">${escapeHtml(issue.description)}</p>
        <div class="recommendation">
          <strong>Recommendation:</strong> ${escapeHtml(issue.recommendation)}
        </div>
        ${
          issue.x != null
            ? `<div class="coords">Location: (${Math.round(issue.x)}, ${Math.round(issue.y ?? 0)}) — ${Math.round(issue.width ?? 0)}×${Math.round(issue.height ?? 0)}px</div>`
            : ''
        }
      </div>`
    )
    .join('');

  const contrastHtml = report.colorContrasts
    .slice(0, 10)
    .map(
      (c) => `
      <tr>
        <td><span class="color-swatch" style="background:${c.foreground}"></span> ${c.foreground}</td>
        <td><span class="color-swatch" style="background:${c.background}"></span> ${c.background}</td>
        <td>${c.ratio}:1</td>
        <td>${c.wcagAA ? '✓' : '✗'}</td>
        <td>${c.wcagAAA ? '✓' : '✗'}</td>
      </tr>`
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Xdesign Report — ${escapeHtml(projectName)}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1f2937; line-height: 1.6; background: #f9fafb; }
    .container { max-width: 900px; margin: 0 auto; padding: 2rem; }
    header { background: linear-gradient(135deg, #4f46e5, #7c3aed); color: white; padding: 2.5rem 2rem; border-radius: 12px; margin-bottom: 2rem; }
    header h1 { font-size: 1.75rem; margin-bottom: 0.5rem; }
    header .meta { opacity: 0.85; font-size: 0.875rem; }
    .overall-score { text-align: center; padding: 2rem; background: white; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 2rem; }
    .overall-score .number { font-size: 4rem; font-weight: 700; color: ${scoreColor(overallScore)}; }
    .overall-score .label { color: #6b7280; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; }
    section { background: white; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    section h2 { font-size: 1.25rem; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid #e5e7eb; }
    .score-row { display: flex; align-items: center; gap: 1rem; margin-bottom: 0.75rem; }
    .score-label { width: 160px; font-size: 0.875rem; flex-shrink: 0; }
    .score-bar-track { flex: 1; height: 8px; background: #e5e7eb; border-radius: 4px; overflow: hidden; }
    .score-bar-fill { height: 100%; border-radius: 4px; transition: width 0.3s; }
    .score-value { width: 36px; text-align: right; font-weight: 600; font-size: 0.875rem; }
    .issue-card { border: 1px solid #e5e7eb; border-radius: 8px; padding: 1rem; margin-bottom: 0.75rem; }
    .issue-header { display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.5rem; }
    .severity-badge { color: white; font-size: 0.625rem; font-weight: 700; padding: 0.15rem 0.5rem; border-radius: 4px; letter-spacing: 0.05em; }
    .issue-category { font-size: 0.75rem; color: #6b7280; text-transform: capitalize; }
    .issue-card h3 { font-size: 1rem; margin-bottom: 0.25rem; }
    .issue-desc { font-size: 0.875rem; color: #4b5563; margin-bottom: 0.5rem; }
    .recommendation { font-size: 0.875rem; background: #f0fdf4; border-left: 3px solid #16a34a; padding: 0.5rem 0.75rem; border-radius: 0 4px 4px 0; }
    .coords { font-size: 0.75rem; color: #9ca3af; margin-top: 0.5rem; }
    ul { padding-left: 1.25rem; }
    li { margin-bottom: 0.25rem; font-size: 0.875rem; }
    table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
    th, td { padding: 0.5rem; text-align: left; border-bottom: 1px solid #e5e7eb; }
    th { font-weight: 600; color: #6b7280; font-size: 0.75rem; text-transform: uppercase; }
    .color-swatch { display: inline-block; width: 16px; height: 16px; border-radius: 3px; border: 1px solid #d1d5db; vertical-align: middle; }
    footer { text-align: center; color: #9ca3af; font-size: 0.75rem; padding: 2rem 0; }
    @media print { body { background: white; } section { box-shadow: none; border: 1px solid #e5e7eb; } }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>${escapeHtml(projectName)}</h1>
      <div class="meta">
        Analysis ID: ${escapeHtml(analysisId)} ·
        Created: ${createdAt.toISOString()}${completedAt ? ` · Completed: ${completedAt.toISOString()}` : ''}
      </div>
    </header>

    <div class="overall-score">
      <div class="number">${overallScore}</div>
      <div class="label">Overall Design Score</div>
    </div>

    <section>
      <h2>Category Scores</h2>
      ${scoreEntries.map(([label, score]) => renderScoreBar(label, score)).join('')}
    </section>

    <section>
      <h2>Summary</h2>
      <p>${escapeHtml(report.summary)}</p>
    </section>

    <section>
      <h2>Strengths</h2>
      <ul>${report.strengths.map((s) => `<li>${escapeHtml(s)}</li>`).join('')}</ul>
    </section>

    <section>
      <h2>Recommendations</h2>
      <ul>${report.recommendations.map((r) => `<li>${escapeHtml(r)}</li>`).join('')}</ul>
    </section>

    <section>
      <h2>Issues (${issues.length})</h2>
      ${issues.length > 0 ? issuesHtml : '<p>No issues detected.</p>'}
    </section>

    ${
      report.colorContrasts.length > 0
        ? `
    <section>
      <h2>Color Contrast Analysis</h2>
      <table>
        <thead>
          <tr><th>Foreground</th><th>Background</th><th>Ratio</th><th>AA</th><th>AAA</th></tr>
        </thead>
        <tbody>${contrastHtml}</tbody>
      </table>
    </section>`
        : ''
    }

    <footer>Generated by Xdesign · ${new Date().toISOString()}</footer>
  </div>
</body>
</html>`;
}

export function generateReportFilename(projectName: string): string {
  const safe = projectName.replace(/[^a-zA-Z0-9-_]/g, '_').slice(0, 50);
  const date = new Date().toISOString().slice(0, 10);
  return `xdesign-report-${safe}-${date}.html`;
}
