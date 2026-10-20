const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function canTrack() {
  return import.meta.env.PROD && Boolean(GA_ID) && typeof window.gtag === "function";
}

export function trackPageView(path: string) {
  if (!canTrack()) return;
  window.gtag!("event", "page_view", {
    page_path: path,
    page_location: window.location.origin + path,
  });
}

export function trackEvent(name: string, params?: Record<string, string>) {
  if (!canTrack()) return;
  window.gtag!("event", name, params);
}
