import WhatsAppIcon from "./WhatsAppIcon"

const FACEBOOK_PATH =
  "M16.671 15.469l.547-3.469h-3.328V9.75c0-.949.465-1.875 1.956-1.875h1.513V4.922s-1.373-.234-2.686-.234c-2.741 0-4.532 1.662-4.532 4.669V12H6.094v3.469h3.047V23.85a12.074 12.074 0 003.75 0V15.469h2.78z"

const TIKTOK_PATH =
  "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"

type SocialIconProps = {
  name: string // "WhatsApp" | "Instagram" | "Facebook" | "TikTok"
  className?: string // tamaño de la insignia, por ejemplo "h-14 w-14"
}

// Insignia de cada red con su forma, color y logo originales
function SocialIcon({ name, className = "h-12 w-12" }: SocialIconProps) {
  switch (name) {
    case "WhatsApp":
      return (
        <span className={`grid shrink-0 place-items-center rounded-full bg-[#25D366] text-white ${className}`}>
          <WhatsAppIcon className="h-3/5 w-3/5" />
        </span>
      )

    case "Facebook":
      // La "f" va reducida y centrada, completa dentro del círculo
      return (
        <span className={`grid shrink-0 place-items-center rounded-full bg-[#1877F2] ${className}`}>
          <svg viewBox="0 0 24 24" className="block h-full w-full" fill="white" aria-hidden="true">
            <g transform="translate(12 12) scale(0.8) translate(-11.656 -14.269)">
              <path d={FACEBOOK_PATH} />
            </g>
          </svg>
        </span>
      )

    case "Instagram":
      // Fondo con el degradado clásico y el logo dibujado en línea
      return (
        <span
          className={`grid shrink-0 place-items-center rounded-xl bg-[radial-gradient(circle_at_30%_107%,#fdf497_0%,#fdf497_5%,#fd5949_45%,#d6249f_60%,#285AEB_90%)] text-white ${className}`}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-3/5 w-3/5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r=".6" fill="currentColor" />
          </svg>
        </span>
      )

    case "TikTok":
      // La nota se dibuja tres veces: cian, rojo y blanco encima (el efecto de TikTok)
      return (
        <span className={`shrink-0 rounded-xl bg-black ${className}`}>
          <svg viewBox="0 0 24 24" className="block h-full w-full" aria-hidden="true">
            <g transform="translate(4.56 4.56) scale(0.62)">
              <path d={TIKTOK_PATH} fill="#25F4EE" transform="translate(-0.8 -0.7)" />
              <path d={TIKTOK_PATH} fill="#FE2C55" transform="translate(0.8 0.7)" />
              <path d={TIKTOK_PATH} fill="#ffffff" />
            </g>
          </svg>
        </span>
      )

    default:
      return null
  }
}

export default SocialIcon