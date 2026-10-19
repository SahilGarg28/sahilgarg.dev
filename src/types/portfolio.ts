/**
 * Portfolio Type Definitions
 * TypeScript interfaces for portfolio data structures
 */

export interface SiteConfig {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl?: string;
  ogImage?: string;
  resumePath: string;
  resumeDownloadFilename: string;
}

export interface ContactPageConfig {
  headline: string;
  intro: string;
}

export interface BuyMeCoffeeConfig {
  enabled: boolean;
  headline: string;
  message: string;
  /** Path under public/, e.g. /upi-qr.png — scan only, no UPI ID on page */
  upiQrImage?: string;
  /** Optional buymeacoffee.com / Ko-fi link for non-UPI supporters */
  externalUrl?: string;
}

export interface ProfilePhotoSlide {
  src: string;
  alt?: string;
  /** How long this photo stays visible before the next one (ms). */
  durationMs: number;
}

export interface PortfolioData {
  site: SiteConfig;
  personalInfo: PersonalInfo;
  profilePhotos: ProfilePhotoSlide[];
  experience: Experience[];
  writing: Writing[];
  speaking: Speaking[];
  projects: Project[];
  education: Education[];
  socialLinks: SocialLink[];
  contactPage: ContactPageConfig;
  buyMeCoffee: BuyMeCoffeeConfig;
}

export interface PersonalInfo {
  name: string;
  title: string;
  location: { city: string; country: string };
  website: string;
  email: string;
  avatar: string;
  bio: string;
  skills: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string | null;
  /** Fallback if highlights is empty */
  description?: string;
  highlights?: string[];
  media?: string;
  current: boolean;
}

export interface Writing {
  id: string;
  title: string;
  publication: string;
  date: string;
  url: string;
  contributors?: string[];
  featured: boolean;
}

export interface Speaking {
  id: string;
  event: string;
  date: string;
  location: string;
  talk: string;
  description?: string;
  url?: string;
  recordingUrl?: string;
  slidesUrl?: string;
  upcoming: boolean;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  status: "active" | "archived";
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  location: string;
  details?: string;
}

export interface SocialLink {
  platform: string;
  username?: string;
  url: string;
}
