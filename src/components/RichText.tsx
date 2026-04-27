import type { RichTextSegment } from "../content/portfolio";

type RichTextProps = {
  segments: RichTextSegment[];
  className?: string;
};

export default function RichText({ segments, className }: RichTextProps) {
  return (
    <p className={className}>
      {segments.map((segment, index) => (
        <span key={`${segment.text}-${index}`} className={segment.highlight ? "soft-underline cursor-default" : undefined}>
          {segment.text}
        </span>
      ))}
    </p>
  );
}
