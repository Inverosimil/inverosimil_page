"use client";
import React from "react";
import { ThemeProvider } from "../context/ThemeContext";
import { LocaleProvider } from "../context/LocaleContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LocaleProvider>{children}</LocaleProvider>
    </ThemeProvider>
  );
} 