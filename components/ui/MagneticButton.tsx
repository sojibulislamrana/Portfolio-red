"use client";

import { useRef, ReactNode, MouseEvent } from "react";
import clsx from "clsx";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  "aria-label"?: string;
}

export default function MagneticButton({
  children,
  className,
  strength = 0.35,
  as: Tag = "button",
  href,
  target,
  rel,
  onClick,
  type = "button",
  "aria-label": ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);

  const onMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    // skip on touch/reduced-motion
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;
    ref.current.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const onMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0px, 0px)";
  };

  const commonProps = {
    ref: ref as React.Ref<HTMLAnchorElement & HTMLButtonElement>,
    className: clsx("mag-btn", className),
    onMouseMove,
    onMouseLeave,
    "aria-label": ariaLabel,
  };

  if (Tag === "a") {
    return (
      <a
        {...commonProps}
        href={href}
        target={target}
        rel={rel}
      >
        {children}
      </a>
    );
  }

  return (
    <button {...commonProps} type={type} onClick={onClick}>
      {children}
    </button>
  );
}
