"use client";
import React from "react";

type Props = {
  github?: string;
  linkedin?: string;
  instagram?: string;
  whatsapp?: string;
  email?: string;
  className?: string;
  size?: number;
};

const iconClass = "w-[1.25rem] h-[1.25rem]";

export default function SocialLinksNew({ github, linkedin, instagram, whatsapp, email, className = "", size = 20 }: Props) {
  const common = "inline-flex items-center justify-center text-foreground/70 hover:text-accent transition-colors duration-200";
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

  const Wrap = ({ href, label, children }: { href?: string; label: string; children: React.ReactNode }) =>
    href ? (
      <a href={href} target="_blank" rel="noreferrer" aria-label={label} title={label} className={common}>
        {children}
      </a>
    ) : (
      <span aria-hidden className={`${common} opacity-60 cursor-default`}>{children}</span>
    );

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* GitHub */}
      <Wrap href={github} label="GitHub">
        <MaskIcon src="/icons/github.svg" />
      </Wrap>

      {/* LinkedIn */}
      <Wrap href={linkedin} label="LinkedIn">
        <MaskIcon src="/icons/linkedin.svg" />
      </Wrap>

      {/* Instagram */}
      <Wrap href={instagram} label="Instagram">
        <MaskIcon src="/icons/instagram.svg" />
      </Wrap>

      {/* WhatsApp */}
      <Wrap href={whatsapp} label="WhatsApp">
        <MaskIcon src="/icons/whatsapp.svg" />
      </Wrap>

      {/* Email */}
      <Wrap href={email} label="Email">
        <MaskIcon src="/icons/email.svg" />
      </Wrap>
    </div>
  );
}
