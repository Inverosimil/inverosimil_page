import type { RichTextSegment } from "../content/portfolio";
import { localeMotion } from "../utils/localeMotion";

type RichTextProps = {
  segments: RichTextSegment[];
  className?: string;
  motionName?: string;
};

export default function RichText({ segments, className, motionName }: RichTextProps) {
  return (
    <p
      {...(motionName ? localeMotion(motionName) : {})}
      className={["locale-animated", className].filter(Boolean).join(" ")}
    >
      {segments.map((segment, index) => (
        <span key={index} className={segment.highlight ? "soft-underline cursor-default" : undefined}>
          {segment.text}
        </span>
      ))}
    </p>
  );
}
