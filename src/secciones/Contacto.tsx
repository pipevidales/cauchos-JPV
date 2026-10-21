import type { ReactNode } from "react"
import SectionHeading from "../componentes/SectionHeading"
import { business, whatsappLink } from "../data/business"

// Ícono de cada red, buscado por nombre
const icons: Record<string, ReactNode> = {
  Instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" />
    </>
  ),
  Facebook: <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8z" />,
  TikTok: <path d="M16 3v10.5a4.5 4.5 0 1 1-4-4.5M16 3a5 5 0 0 0 4 4" />,
  WhatsApp: <path d="M21 12a8 8 0 0 1-11.9 7L3 21l2-5.9A8 8 0 1 1 21 12z" />,
}

function Contacto() {
  // WhatsApp primero (es el canal principal de venta), luego las redes
  const canales = [
    { name: "WhatsApp", handle: business.whatsappDisplay, url: whatsappLink() },
    ...business.socials.map((s) => ({ name: s.name, handle: s.handle, url: s.url })),
  ]

  return (
    <section id="contacto" className="mx-auto max-w-5xl px-6 py-20">
      <SectionHeading eyebrow="Contacto" title="Contáctanos" />

      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {canales.map(({ name, handle, url }) => (
          <li key={name}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-5 transition duration-200 hover:-translate-y-1 hover:border-brand/60"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand text-white">
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {icons[name]}
                </svg>
              </span>
              <span>
                <span className="block text-sm text-muted">{name}</span>
                <span className="block text-lg font-semibold">{handle}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Contacto