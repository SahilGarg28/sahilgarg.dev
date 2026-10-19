import { Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { downloadResume } from "@/lib/download-resume";
import { site } from "@/data/portfolio-data";

/**
 * ResumeButton — labeled download control for the CV PDF.
 * Served same-origin from public/resume.pdf so the `download` attribute applies.
 */
export function ResumeButton({ className }: { className?: string }) {
  return (
    <a
      href={site.resumePath}
      download={site.resumeDownloadFilename}
      onClick={downloadResume}
      aria-label="Download resume as PDF"
      className={cn(
        "inline-flex items-center gap-2 border border-border bg-card px-5 py-3 text-small uppercase tracking-[0.15em] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]",
        className
      )}
    >
      <Download size={14} />
      Download Resume
    </a>
  );
}

export default ResumeButton;
