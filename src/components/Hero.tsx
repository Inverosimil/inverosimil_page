"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useLocale } from "../context/LocaleContext";
import Typewriter from "./Typewriter";

export default function Hero() {
  const { t, /* locale */ } = useLocale();

  return (
    <section id="inicio" className="relative min-h-[100svh] flex items-center">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 w-full grid md:grid-cols-2 gap-10 items-center py-12 md:py-0">
        <div className="order-2 md:order-1 text-center md:text-left">
          <h1 className="text-3xl sm:text-5xl md:text-6xl leading-tight font-semibold tracking-tight">
            <span className="text-accent">$</span>{" "}
            <Typewriter text={t("hero.title")} restartKey={t("hero.title")} className="align-middle" />
          </h1>
          <p className="mt-4 mx-auto md:mx-0 max-w-xl text-foreground/80 text-sm sm:text-base">
            {t("hero.subtitle")}
          </p>
          <div className="mt-6 flex justify-center md:justify-start flex-wrap items-center gap-3">
            <Link href="#proyectos" className="px-4 py-2 text-[13px] rounded border border-accent bg-accent text-white hover:opacity-90">
              {t("cta.proyectos")}
            </Link>
            <a href="mailto:hello@inverosimil.dev" className="px-4 py-2 text-[13px] rounded border border-accent/40 hover:border-accent/60">
              {t("cta.contacto")}
            </a>
          </div>
        </div>
        <div className="order-1 md:order-2 relative aspect-square w-full max-w-md md:max-w-full mx-auto">
          <div className="absolute -inset-6 rounded-3xl bg-accent/20 blur-2xl -z-10" aria-hidden />
          <Image
            src="/profile_image.png"
            alt="Foto de perfil"
            fill
            priority
            sizes="(max-width: 768px) 80vw, 40vw"
            className="object-cover rounded-3xl shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
} 