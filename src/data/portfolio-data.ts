/** Content lives in portfolio.json — edit that file only. */

import portfolioJson from "./portfolio.json";
import type { PortfolioData } from "@/types/portfolio";

export const portfolio = portfolioJson as PortfolioData;

export const {
  site,
  personalInfo,
  profilePhotos,
  experience,
  education,
  socialLinks,
  contactPage,
  buyMeCoffee,
} = portfolio;
