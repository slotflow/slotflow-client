import gsap from "gsap";

interface SlideOptions {
  yFrom?: number;
  yTo?: number;
  opacityFrom?: number;
  opacityTo?: number;
  duration?: number;
  ease?: string;
  onComplete?: () => void;
}

/** Slide IN (top → center) */
export const slideIn = (
  element: HTMLElement | null,
  {
    yFrom = -120,
    yTo = 0,
    opacityFrom = 0,
    opacityTo = 1,
    duration = 0.45,
    ease = "power3.out",
  }: SlideOptions = {}
) => {
  if (!element) return;

  gsap.fromTo(
    element,
    { y: yFrom, opacity: opacityFrom },
    { y: yTo, opacity: opacityTo, duration, ease }
  );
};

/** Slide OUT (center → top) */
export const slideOut = (
  element: HTMLElement | null,
  {
    yTo = -120,
    opacityTo = 0,
    duration = 0.35,
    ease = "power3.in",
    onComplete,
  }: SlideOptions = {}
) => {
  if (!element) return;

  gsap.to(element, {
    y: yTo,
    opacity: opacityTo,
    duration,
    ease,
    onComplete,
  });
};
