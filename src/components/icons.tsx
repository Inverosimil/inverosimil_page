import { useId, type SVGProps } from "react";
import { GH, GH_FACE, GH_FACE_CARVE, GH_META, GH_TAIL, GH_TAIL_CARVE, GM, GM_CLIP, GM_PAPER, IG, LI, WA } from "./socialIconPaths";

// Iconos de interfaz: trazo sin relleno. Todos heredan `currentColor`, así
// siguen el tema y la paleta activa sin filtros CSS.
type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Icon({ size = 20, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable={false}
      {...props}
    >
      {children}
    </svg>
  );
}

// ── Iconos sociales: relleno sólido (los SVG descargados) con una animación
// dentro de cada uno. Se disparan por CSS con `.social-link:hover .si-*`
// (globals.css) y sólo bajo prefers-reduced-motion: no-preference.
type FilledIconProps = IconProps & { viewBox?: string };

function FilledIcon({ size = 20, viewBox = "0 0 24 24", children, ...props }: FilledIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="currentColor"
      overflow="visible"
      aria-hidden
      focusable={false}
      {...props}
    >
      {children}
    </svg>
  );
}

const box = (origin: string) => ({ transformBox: "view-box" as const, transformOrigin: origin });

/** GitHub: la cara y la cola del gato son huecos. Se rellenan con un parche (con
 *  trazo, para que su borde no coincida con el del recorte) y una máscara los
 *  vuelve a tallar desplazados: se anima la ausencia. La cara se sesga anclada
 *  en y=17 (una pieza, sin costura); la cola gira desde su corte vertical. */
export function GitHubIcon(props: IconProps) {
  const id = useId();
  const mask = `gh-m${id}`, clipFace = `gh-f${id}`, clipTail = `gh-t${id}`;
  const { faceTop, faceBottom, faceAnchorY, tailCutX, tailPivot } = GH_META;
  const patch = { stroke: "currentColor", strokeWidth: 0.34, strokeLinejoin: "round" as const };
  return (
    <FilledIcon {...props}>
      <defs>
        <clipPath id={clipFace}><rect x="0" y={faceTop} width="24" height={faceBottom - faceTop} /></clipPath>
        <clipPath id={clipTail}><rect x="0" y="0" width={tailCutX - 0.12} height="24" /></clipPath>
        <mask id={mask} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
          <rect x="0" y="0" width="24" height="24" fill="#fff" />
          <path d={GH_FACE_CARVE} fill="#000" className="si-ghhead" style={box(`12px ${faceAnchorY}px`)} />
          <path d={GH_TAIL_CARVE} fill="#000" className="si-ghtail" style={box(`${tailPivot[0]}px ${tailPivot[1]}px`)} />
        </mask>
      </defs>
      <g mask={`url(#${mask})`}>
        <path d={GH} />
        <g clipPath={`url(#${clipFace})`}><path d={GH_FACE} {...patch} /></g>
        <g clipPath={`url(#${clipTail})`}><path d={GH_TAIL} {...patch} /></g>
      </g>
    </FilledIcon>
  );
}

/** LinkedIn: el punto de la i salta y la barra se estira desde su base. */
export function LinkedInIcon(props: IconProps) {
  return (
    <FilledIcon viewBox="0 0 512 512" {...props}>
      <path d={LI[0]} className="si-libar" style={box("62px 500px")} />
      <path d={LI[1]} className="si-lidot" style={box("62px 68px")} />
      <path d={LI[2]} />
    </FilledIcon>
  );
}

/** Instagram: flash. El punto destella (crece de golpe y vuelve) y suelta un
 *  anillo que se expande y se apaga. */
export function InstagramIcon(props: IconProps) {
  const flash = box("17.67px 5.02px");
  return (
    <FilledIcon {...props}>
      <path d={`${IG[0]} ${IG[1]}`} />
      <path d={`${IG[3]} ${IG[4]}`} />
      <circle cx="17.67" cy="5.02" r="1.44" fill="none" stroke="currentColor" strokeWidth={0.45} opacity={0} className="si-igburst" style={flash} />
      <path d={IG[2]} className="si-igflash" style={flash} />
    </FilledIcon>
  );
}

/** WhatsApp: el auricular se inclina como si sonara. */
export function WhatsAppIcon(props: IconProps) {
  return (
    <FilledIcon {...props}>
      <path d={`${WA[1]} ${WA[2]}`} />
      <path d={WA[0]} className="si-waph" style={box("11.7px 12.2px")} />
    </FilledIcon>
  );
}

/** Gmail: una hoja sube desde detrás de la M. Sólo existe dentro de la V (clip
 *  estático), así que escondida por debajo del vértice no se ve nada de ella. */
export function MailIcon(props: IconProps) {
  const id = useId();
  const clip = `gm-c${id}`, mask = `gm-m${id}`;
  const { y, h } = GM_PAPER;
  return (
    <FilledIcon {...props}>
      <defs>
        <clipPath id={clip}><path d={GM_CLIP} /></clipPath>
        <mask id={mask} maskUnits="userSpaceOnUse" x="6" y="-4" width="12" height="16">
          <rect x="7.6" y={y} width="8.8" height={h} rx="0.9" fill="#fff" />
          <rect x="9.2" y={y + 1.7} width="5.6" height="0.8" rx="0.4" fill="#000" />
          <rect x="9.2" y={y + 3.3} width="3.9" height="0.8" rx="0.4" fill="#000" />
        </mask>
      </defs>
      <g clipPath={`url(#${clip})`}>
        <g className="si-gmpaper">
          <rect x="7.6" y={y} width="8.8" height={h} rx="0.9" mask={`url(#${mask})`} />
        </g>
      </g>
      <path d={GM} />
    </FilledIcon>
  );
}

export function DownloadIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3v12m0 0 4-4m-4 4-4-4" />
      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    </Icon>
  );
}

export function ExternalLinkIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M7 17 17 7M8 7h9v9" />
    </Icon>
  );
}

export function SunIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4m11.4-11.4 1.4-1.4" />
    </Icon>
  );
}

export function MoonIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </Icon>
  );
}

export function PaletteIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3a9 9 0 0 0 0 18c1.1 0 2-.9 2-2v-.5a1.5 1.5 0 0 1 1.5-1.5H17a4 4 0 0 0 4-4 10 10 0 0 0-9-10z" />
      <circle cx="7.5" cy="11.5" r="1" />
      <circle cx="10.5" cy="7.5" r="1" />
      <circle cx="15.5" cy="7.5" r="1" />
    </Icon>
  );
}

export function SettingsIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </Icon>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M18 6 6 18M6 6l12 12" />
    </Icon>
  );
}
