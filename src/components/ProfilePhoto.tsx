import { useEffect, useState, useSyncExternalStore } from "react";
import { personalInfo, profilePhotos } from "@/data/portfolio-data";
import { cn } from "@/lib/utils";

const FADE_MS = 700;

type ProfilePhotoProps = Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  "src" | "alt"
> & {
  alt?: string;
};

function slides() {
  return profilePhotos.length > 0
    ? profilePhotos
    : [{ src: personalInfo.avatar, durationMs: 4000, alt: undefined }];
}

let index = 0;
let timer: ReturnType<typeof setTimeout> | undefined;
const listeners = new Set<() => void>();

function scheduleNext() {
  clearTimeout(timer);
  const list = slides();
  if (list.length <= 1) return;
  index = index % list.length;
  const ms = list[index].durationMs > 0 ? list[index].durationMs : 4000;
  timer = setTimeout(() => {
    index = (index + 1) % list.length;
    listeners.forEach((l) => l());
    scheduleNext();
  }, ms);
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  if (listeners.size === 1) scheduleNext();
  return () => {
    listeners.delete(onStoreChange);
    if (listeners.size === 0) clearTimeout(timer);
  };
}

function getIndex() {
  return index;
}

function slideAlt(slide: (ReturnType<typeof slides>)[number], fallback?: string) {
  return slide.alt ?? fallback ?? personalInfo.name;
}

/** Cycles through profilePhotos from portfolio.json; each slide has its own durationMs. */
export default function ProfilePhoto({
  className,
  style,
  alt,
  id,
  ...rest
}: ProfilePhotoProps) {
  const slideIndex = useSyncExternalStore(subscribe, getIndex, getIndex);
  const list = slides();
  const current = slideIndex % list.length;

  const [baseIndex, setBaseIndex] = useState(current);
  const [overlayIndex, setOverlayIndex] = useState<number | null>(null);
  const [overlayVisible, setOverlayVisible] = useState(false);

  useEffect(() => {
    slides().forEach((s) => {
      const img = new Image();
      img.src = s.src;
    });
  }, []);

  useEffect(() => {
    if (list.length <= 1 || current === baseIndex) return;

    setOverlayIndex(current);
    setOverlayVisible(false);
    const startFade = requestAnimationFrame(() => {
      requestAnimationFrame(() => setOverlayVisible(true));
    });

    const done = window.setTimeout(() => {
      setBaseIndex(current);
      setOverlayIndex(null);
      setOverlayVisible(false);
    }, FADE_MS);

    return () => {
      cancelAnimationFrame(startFade);
      window.clearTimeout(done);
    };
  }, [current, baseIndex, list.length]);

  if (list.length <= 1) {
    const slide = list[0];
    return (
      <img
        id={id}
        {...rest}
        src={slide.src}
        alt={slideAlt(slide, alt)}
        className={className}
        style={style}
      />
    );
  }

  const base = list[baseIndex];
  const overlay = overlayIndex !== null ? list[overlayIndex] : null;

  return (
    <div id={id} className={cn("relative overflow-hidden", className)} style={style}>
      <img
        {...rest}
        src={base.src}
        alt={slideAlt(base, alt)}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      {overlay && (
        <img
          src={overlay.src}
          alt=""
          aria-hidden
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity ease-in-out",
            overlayVisible ? "opacity-100" : "opacity-0"
          )}
          style={{ transitionDuration: `${FADE_MS}ms` }}
          draggable={false}
        />
      )}
    </div>
  );
}
