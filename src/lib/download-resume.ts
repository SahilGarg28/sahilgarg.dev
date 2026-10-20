import { site } from "@/data/portfolio-data";
import { trackEvent } from "@/lib/analytics";

/**
 * Fetches the resume in-page and saves it as a blob. A plain link download
 * fails inside the editor preview because the browser re-requests the file
 * without the preview session; an in-page fetch keeps it.
 */
export async function downloadResume(e?: { preventDefault: () => void }) {
  e?.preventDefault();
  const resumePath = site.resumePath || "/resume.pdf";
  const filename = site.resumeDownloadFilename || "resume.pdf";
  try {
    const res = await fetch(resumePath);
    if (!res.ok) throw new Error(String(res.status));
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    trackEvent("resume_download", { method: "blob" });
    setTimeout(() => URL.revokeObjectURL(url), 30_000);
  } catch {
    trackEvent("resume_download", { method: "fallback" });
    window.open(resumePath, "_blank");
  }
}
