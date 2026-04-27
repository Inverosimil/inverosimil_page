import type { HTMLAttributes } from "react";

type MotionAttributes = HTMLAttributes<HTMLElement> & {
  "data-locale-motion": string;
};

export function localeMotion(name: string): MotionAttributes {
  return {
    "data-locale-motion": name,
  };
}
