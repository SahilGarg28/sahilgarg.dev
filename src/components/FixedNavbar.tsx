import { downloadResume } from "@/lib/download-resume";
import { personalInfo, site, socialLinks, buyMeCoffee } from "@/data/portfolio-data";
import ProfilePhoto from "@/components/ProfilePhoto";
import { Mail, Linkedin, Github, Download, Coffee, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const linkedInUrl = socialLinks.find((l) => l.platform === "LinkedIn")?.url;
const githubUrl = socialLinks.find((l) => l.platform === "GitHub")?.url;

type FixedNavbarProps = {
  /** Home: scroll-linked center photo. Page: name links home, no center photo. */
  variant?: "home" | "page";
};

export default function FixedNavbar({ variant = "home" }: FixedNavbarProps) {
  const [showPhoto, setShowPhoto] = useState(false);
  const location = useLocation();
  const isHome = variant === "home";

  useEffect(() => {
    if (!isHome) return;
    const heroPhoto = document.getElementById("hero-photo");
    if (!heroPhoto) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowPhoto(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(heroPhoto);
    return () => observer.disconnect();
  }, [isHome]);

  const nameBlock = (
    <>
      <span className="text-sm font-medium whitespace-nowrap">{personalInfo.name}</span>
      <span className="text-sm text-muted-foreground hidden sm:inline">•</span>
      <span className="text-sm text-muted-foreground truncate hidden sm:inline">{personalInfo.title}</span>
    </>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 h-[44px] bg-background border-b border-border z-50 flex items-center">
      <div className="w-full flex items-center justify-between">
        {/* Left: Name + Role */}
        <div className="flex items-center h-[44px] px-4 gap-2 md:gap-3 overflow-hidden">
          {isHome ? (
            nameBlock
          ) : (
            <Link to="/" className="flex items-center gap-2 md:gap-3 min-w-0 hover:text-[var(--color-primary)] transition-colors">
              {nameBlock}
            </Link>
          )}
        </div>

        {/* Center: Photo */}
        <div
          className={cn(
            "absolute left-1/2 -translate-x-1/2 transition-opacity duration-300 hidden md:block",
            isHome && showPhoto ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          <ProfilePhoto
            className="w-[28px] h-[28px] object-cover"
            style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}
          />
        </div>

        {/* Right: Contact buttons */}
        <div className="flex items-center h-[44px]">
          <Link
            to="/contact"
            className={cn(
              "flex items-center justify-center w-[44px] h-[44px] hover:text-[var(--color-primary)] transition-colors",
              location.pathname === "/contact" && "text-[var(--color-primary)]"
            )}
            aria-label="Contact page"
            title="Contact"
          >
            <MessageSquare size={16} />
          </Link>
          {buyMeCoffee.enabled && (
            <Link
              to="/coffee"
              className={cn(
                "flex items-center justify-center w-[44px] h-[44px] hover:text-[var(--color-primary)] transition-colors",
                location.pathname === "/coffee" && "text-[var(--color-primary)]"
              )}
              aria-label="Buy me a coffee"
              title="Buy me a coffee"
            >
              <Coffee size={16} />
            </Link>
          )}
          <a
            href={site.resumePath}
            onClick={downloadResume}
            download
            className="flex items-center justify-center w-[44px] h-[44px] hover:text-[var(--color-primary)] transition-colors"
            aria-label="Download Resume"
          >
            <Download size={16} />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="flex items-center justify-center w-[44px] h-[44px] hover:text-[var(--color-primary)] transition-colors"
            aria-label="Email"
          >
            <Mail size={16} />
          </a>
          {linkedInUrl && (
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-[44px] h-[44px] hover:text-[var(--color-primary)] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-[44px] h-[44px] hover:text-[var(--color-primary)] transition-colors"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}
