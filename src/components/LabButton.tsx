import { type CSSProperties, type MouseEvent, type PointerEvent, useEffect, useRef, useState } from "react";

type LabButtonProps = {
  href: string;
  label: string;
  icon: string;
  sprite?: string;
  variant?: "primary" | "log" | "random";
};

export function LabButton({ href, label, icon, sprite, variant = "primary" }: LabButtonProps) {
  const [isSpritePlaying, setIsSpritePlaying] = useState(false);
  const resetTimerRef = useRef<number | undefined>(undefined);
  const navigateTimerRef = useRef<number | undefined>(undefined);
  const lastPointerTypeRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current !== undefined) {
        window.clearTimeout(resetTimerRef.current);
      }

      if (navigateTimerRef.current !== undefined) {
        window.clearTimeout(navigateTimerRef.current);
      }
    };
  }, []);

  const playSpriteOnce = (event?: PointerEvent<HTMLAnchorElement>) => {
    if (!sprite) {
      return;
    }

    if (event) {
      lastPointerTypeRef.current = event.pointerType;
    }

    if (resetTimerRef.current !== undefined) {
      window.clearTimeout(resetTimerRef.current);
    }

    setIsSpritePlaying(false);
    window.requestAnimationFrame(() => {
      setIsSpritePlaying(true);
      resetTimerRef.current = window.setTimeout(() => setIsSpritePlaying(false), 820);
    });
  };

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const isTouchLike = lastPointerTypeRef.current === "touch" || lastPointerTypeRef.current === "pen";

    if (!sprite || !isTouchLike || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    event.preventDefault();

    if (navigateTimerRef.current !== undefined) {
      window.clearTimeout(navigateTimerRef.current);
    }

    navigateTimerRef.current = window.setTimeout(() => {
      window.location.assign(href);
    }, 640);
  };

  const className = [
    "lab-button",
    `lab-button--${variant}`,
    sprite ? "lab-button--with-sprite" : "",
    isSpritePlaying ? "is-sprite-playing" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const spriteStyle = sprite ? ({ "--sprite-url": `url(${sprite})` } as CSSProperties) : undefined;

  return (
    <a className={className} href={href} onClick={handleClick} onPointerDown={playSpriteOnce}>
      {sprite ? (
        <span className="lab-button__sprite" style={spriteStyle} aria-hidden="true" />
      ) : (
        <img className="lab-button__icon" src={icon} alt="" aria-hidden="true" />
      )}
      <span>{label}</span>
      <span className="lab-button__arrow" aria-hidden="true">
        →
      </span>
    </a>
  );
}
