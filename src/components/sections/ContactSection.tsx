import { personalInfo, buyMeCoffee } from "@/data/portfolio-data";
import ProfilePhoto from "@/components/ProfilePhoto";
import SplitSection from "@/components/ui/split-section";
import ResumeButton from "@/components/ResumeButton";
import { Link } from "react-router-dom";

/**
 * ContactSection Component
 * Centered contact section
 */
export default function ContactSection() {
  return (
    <SplitSection title="Contact" id="contact" count={5}>
      <div className="text-center space-y-6">
        <div className="flex justify-center mb-8">
          <ProfilePhoto
            className="w-40 h-48 object-cover"
            style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}
          />
        </div>

        <p className="text-large">{personalInfo.name}</p>

        <a
          href={`mailto:${personalInfo.email}`}
          className="text-body hover:text-[var(--color-primary)] transition-colors block"
        >
          {personalInfo.email}
        </a>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
          <ResumeButton />
          <Link
            to="/contact"
            className="text-small uppercase tracking-[0.15em] hover:text-[var(--color-primary)] transition-colors"
          >
            Contact page →
          </Link>
          {buyMeCoffee.enabled && (
            <Link
              to="/coffee"
              className="text-small uppercase tracking-[0.15em] hover:text-[var(--color-primary)] transition-colors"
            >
              Buy me a coffee →
            </Link>
          )}
        </div>

        {personalInfo.website && (
          <a
            href={`https://${personalInfo.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-body hover:text-[var(--color-primary)] transition-colors block"
          >
            {personalInfo.website}
          </a>
        )}
      </div>
    </SplitSection>
  );
}
