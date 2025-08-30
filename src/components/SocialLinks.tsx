"use client";
import React from "react";

type Props = {
  github?: string;
  linkedin?: string;
  instagram?: string;
  whatsapp?: string; // full URL like https://wa.me/...
  email?: string; // mailto:...
  className?: string;
  size?: number; // px
};

const iconClass = "w-[1.25rem] h-[1.25rem]"; // ~20px

export default function SocialLinks({ github, linkedin, instagram, whatsapp, email, className = "", size = 20 }: Props) {
  const commonLink =
    "inline-flex items-center justify-center text-foreground/70 hover:text-accent transition-colors duration-200";

  const dim = { width: size, height: size };

  const MaskIcon = ({ src }: { src: string }) => (
    <span
      aria-hidden
      className={iconClass}
      style={{
        ...dim,
        display: "inline-block",
        backgroundColor: "currentColor",
        WebkitMaskImage: `url(${src})`,
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        WebkitMaskSize: "contain",
        maskImage: `url(${src})`,
        maskRepeat: "no-repeat",
        maskPosition: "center",
        maskSize: "contain",
      }}
    />
  );

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {github ? (
        <a href={github} target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub" className={commonLink}>
          <MaskIcon src="/icons/github.svg" />
        </a>
      ) : (
        <span aria-hidden className={`${commonLink} opacity-60 cursor-default`}>
          <MaskIcon src="/icons/github.svg" />
        </span>
      )}

      {linkedin ? (
        <a href={linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn" className={commonLink}>
          <MaskIcon src="/icons/linkedin.svg" />
        </a>
      ) : (
        <span aria-hidden className={`${commonLink} opacity-60 cursor-default`}>
          <MaskIcon src="/icons/linkedin.svg" />
        </span>
      )}

      {instagram ? (
        <a href={instagram} target="_blank" rel="noreferrer" aria-label="Instagram" title="Instagram" className={commonLink}>
          <MaskIcon src="/icons/instagram.svg" />
        </a>
      ) : (
        <span aria-hidden className={`${commonLink} opacity-60 cursor-default`}>
          <MaskIcon src="/icons/instagram.svg" />
        </span>
      )}

      {whatsapp ? (
        <a href={whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp" title="WhatsApp" className={commonLink}>
          <MaskIcon src="/icons/whatsapp.svg" />
        </a>
      ) : (
        <span aria-hidden className={`${commonLink} opacity-60 cursor-default`}>
          <MaskIcon src="/icons/whatsapp.svg" />
        </span>
      )}

      {email ? (
        <a href={email} aria-label="Email" title="Email" className={commonLink}>
          <MaskIcon src="/icons/email.svg" />
        </a>
      ) : (
        <span aria-hidden className={`${commonLink} opacity-60 cursor-default`}>
          <MaskIcon src="/icons/email.svg" />
        </span>
      )}
    </div>
  );
}
