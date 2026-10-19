import { site, personalInfo } from "@/data/portfolio-data";

function setMeta(name: string, content: string, property = false) {
  if (!content) return;
  const attr = property ? "property" : "name";
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/** Applies title and SEO tags from portfolio.json after the app loads. */
export function applySiteMeta() {
  document.title = site.title;

  setMeta("description", site.description);
  setMeta("keywords", site.keywords);
  setMeta("author", personalInfo.name);

  setMeta("og:type", "website", true);
  setMeta("og:title", site.title, true);
  setMeta("og:description", site.description, true);
  if (site.canonicalUrl) {
    setMeta("og:url", site.canonicalUrl, true);
  }
  if (site.ogImage) {
    setMeta("og:image", site.ogImage, true);
  }

  setMeta("twitter:card", "summary_large_image");
  setMeta("twitter:title", site.title);
  setMeta("twitter:description", site.description);
  if (site.ogImage) {
    setMeta("twitter:image", site.ogImage);
  }

  if (site.canonicalUrl) {
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = site.canonicalUrl;
  }
}
