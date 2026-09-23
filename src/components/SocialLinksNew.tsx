"use client";
import React from "react";
import { usePlayOnce } from "../utils/playOnce";
import { GitHubIcon, InstagramIcon, LinkedInIcon, MailIcon, WhatsAppIcon } from "./icons";

type Props = {
  github?: string;
  linkedin?: string;
  instagram?: string;
  whatsapp?: string;
  email?: string;
  className?: string;
  size?: number;
};

const linkClass =
  "social-link inline-flex items-center justify-center w-9 h-9 -m-1 rounded-full text-foreground/70 hover:text-accent transition-colors duration-200";

export default function SocialLinksNew({ github, linkedin, instagram, whatsapp, email, className = "", size = 22 }: Props) {
  const play = usePlayOnce();

  const items = [
    { href: github, label: "GitHub", Icon: GitHubIcon, scale: 1 },
    { href: linkedin, label: "LinkedIn", Icon: LinkedInIcon, scale: 0.94 },
    { href: instagram, label: "Instagram", Icon: InstagramIcon, scale: 1.18 },
    { href: whatsapp, label: "WhatsApp", Icon: WhatsAppIcon, scale: 0.97 },
    { href: email, label: "Email", Icon: MailIcon, scale: 0.99 },
  ].filter((item) => item.href);

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {items.map(({ href, label, Icon, scale }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          title={label}
          className={linkClass}
          onPointerEnter={play}
          onFocus={play}
        >
          <Icon size={Math.round(size * scale * 10) / 10} />
        </a>
      ))}
    </div>
  );
}
