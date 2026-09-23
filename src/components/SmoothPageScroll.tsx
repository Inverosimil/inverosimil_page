"use client";

import { useEffect, useRef } from "react";

const scrollEase = 0.18;
const wheelMultiplier = 0.92;
const maxWheelStep = 260;
const stopThreshold = 0.45;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function normalizeWheelDelta(event: WheelEvent) {
  const unit = event.deltaMode === WheelEvent.DOM_DELTA_LINE
    ? 16
    : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
      ? window.innerHeight
      : 1;
  const delta = event.deltaY * unit * wheelMultiplier;

  return Math.sign(delta) * Math.min(Math.abs(delta), maxWheelStep);
}

function canScrollableElementMove(element: HTMLElement, deltaY: number) {
  const { overflowY } = window.getComputedStyle(element);
  if (!/(auto|scroll|overlay)/.test(overflowY)) return false;
  if (element.scrollHeight <= element.clientHeight) return false;

  if (deltaY > 0) {
    return element.scrollTop + element.clientHeight < element.scrollHeight - 1;
  }

  return element.scrollTop > 1;
}

function hasScrollableAncestor(target: EventTarget | null, deltaY: number) {
  if (!(target instanceof Element)) return false;

  let element: Element | null = target;
  while (element && element !== document.body && element !== document.documentElement) {
    if (element instanceof HTMLElement && canScrollableElementMove(element, deltaY)) {
      return true;
    }

    element = element.parentElement;
  }

  return false;
}

export default function SmoothPageScroll() {
  const frameRef = useRef<number | null>(null);
  const currentYRef = useRef(0);
  const targetYRef = useRef(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";

    const maxScrollY = () => Math.max(0, root.scrollHeight - window.innerHeight);

    const stopAnimation = () => {
      if (frameRef.current != null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };

    const animate = () => {
      const currentY = currentYRef.current;
      const targetY = targetYRef.current;
      const nextY = currentY + (targetY - currentY) * scrollEase;

      if (Math.abs(targetY - nextY) <= stopThreshold) {
        currentYRef.current = targetY;
        window.scrollTo({ top: targetY, behavior: "auto" });
        frameRef.current = null;
        return;
      }

      currentYRef.current = nextY;
      window.scrollTo({ top: nextY, behavior: "auto" });
      frameRef.current = window.requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (frameRef.current == null) {
        frameRef.current = window.requestAnimationFrame(animate);
      }
    };

    const onWheel = (event: WheelEvent) => {
      if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.deltaY === 0) return;

      const deltaY = normalizeWheelDelta(event);
      if (hasScrollableAncestor(event.target, deltaY)) return;

      event.preventDefault();

      if (frameRef.current == null) {
        currentYRef.current = window.scrollY;
        targetYRef.current = window.scrollY;
      }

      targetYRef.current = clamp(targetYRef.current + deltaY, 0, maxScrollY());
      startAnimation();
    };

    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      stopAnimation();
      root.style.scrollBehavior = previousScrollBehavior;
    };
  }, []);

  return null;
}
