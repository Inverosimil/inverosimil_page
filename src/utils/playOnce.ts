import { useEffect, useRef } from "react";

/**
 * Reproduce una animación de una sola pasada sin atarla a `:hover`: marca el
 * elemento con `is-playing` y retira la marca cuando ya ha terminado, así la
 * animación se completa aunque el puntero salga a la mitad. Volver a entrar
 * mientras corre no la reinicia.
 *
 * La duración no se repite en el código: se lee de `--si-dur`, declarada junto
 * a las reglas de la animación en globals.css.
 */
export function usePlayOnce(fallbackMs = 800) {
  const timers = useRef(new Set<number>());

  useEffect(() => {
    const pending = timers.current;
    return () => {
      pending.forEach((id) => window.clearTimeout(id));
      pending.clear();
    };
  }, []);

  return (event: React.SyntheticEvent<HTMLElement>) => {
    const element = event.currentTarget;
    if (element.classList.contains("is-playing")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    element.classList.add("is-playing");
    const declared = window.getComputedStyle(element).getPropertyValue("--si-dur").trim();
    const value = Number.parseFloat(declared) || 0;
    const ms = declared.endsWith("ms") || !declared.endsWith("s") ? value : value * 1000;
    const id = window.setTimeout(() => {
      element.classList.remove("is-playing");
      timers.current.delete(id);
    }, (ms || fallbackMs) + 40);
    timers.current.add(id);
  };
}
