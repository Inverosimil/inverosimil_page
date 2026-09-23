"use client";
import React from "react";
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
  const items = [
    { href: github, label: "GitHub", Icon: GitHubIcon },
    { href: linkedin, label: "LinkedIn", Icon: LinkedInIcon },
    { href: instagram, label: "Instagram", Icon: InstagramIcon },
    { href: whatsapp, label: "WhatsApp", Icon: WhatsAppIcon },
    { href: email, label: "Email", Icon: MailIcon },
  ].filter((item) => item.href);

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {items.map(({ href, label, Icon }) => (
        <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} title={label} className={linkClass}>
          <Icon size={size} />
        </a>
      ))}
    </div>
  );
}
