import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import FixedNavbar from "@/components/FixedNavbar";
import ResumeButton from "@/components/ResumeButton";
import {
  contactPage,
  personalInfo,
  socialLinks,
} from "@/data/portfolio-data";
import { ArrowLeft, Mail, MapPin } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function ContactPage() {
  const locationLabel = [personalInfo.location.city, personalInfo.location.country]
    .filter(Boolean)
    .join(", ");

  return (
    <Layout>
      <FixedNavbar variant="page" />
      <div className="pt-[44px] min-h-screen">
        <div className="max-w-2xl mx-auto px-6 py-16 md:py-24 space-y-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-small text-muted-foreground hover:text-[var(--color-primary)] transition-colors"
          >
            <ArrowLeft size={14} />
            Back to portfolio
          </Link>

          <header className="space-y-4">
            <h1 className="text-section">{contactPage.headline}</h1>
            <p className="text-body text-muted-foreground">{contactPage.intro}</p>
          </header>

          <div className="border border-border bg-card p-6 md:p-8 space-y-6">
            <div className="flex gap-4 items-start">
              <Mail size={20} className="mt-1 shrink-0 text-[var(--color-primary)]" />
              <div>
                <p className="text-small uppercase tracking-[0.12em] text-muted-foreground mb-1">
                  Email
                </p>
                <a
                  href={`mailto:${personalInfo.email}`}
                  onClick={() => trackEvent("contact_email_click", { location: "contact_page" })}
                  className="text-large hover:text-[var(--color-primary)] transition-colors break-all"
                >
                  {personalInfo.email}
                </a>
              </div>
            </div>

            {locationLabel && (
              <div className="flex gap-4 items-start">
                <MapPin size={20} className="mt-1 shrink-0 text-[var(--color-primary)]" />
                <div>
                  <p className="text-small uppercase tracking-[0.12em] text-muted-foreground mb-1">
                    Location
                  </p>
                  <p className="text-body">{locationLabel}</p>
                </div>
              </div>
            )}

            {socialLinks.length > 0 && (
              <div className="pt-2 border-t border-border space-y-3">
                <p className="text-small uppercase tracking-[0.12em] text-muted-foreground">
                  Elsewhere
                </p>
                <ul className="space-y-2">
                  {socialLinks.map((link) => (
                    <li key={link.platform}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-body hover:text-[var(--color-primary)] transition-colors"
                      >
                        {link.platform}
                        {link.username ? ` · @${link.username}` : ""}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-4">
              <ResumeButton />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
