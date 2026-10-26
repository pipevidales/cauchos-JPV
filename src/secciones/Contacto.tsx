import type { ReactNode } from "react"
import Reveal from "../componentes/Reveal"
import SectionBand from "../componentes/SectionBand"
import TreadBackground from "../componentes/TreadBackground"
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
    <section id="contacto" className="relative isolate overflow-hidden border-t border-line bg-surface/40 pb-16">
      <TreadBackground />

      {/* Barra roja a todo el ancho, igual que en las demás secciones */}
      <SectionBand>Contacto</SectionBand>

      <div className="mx-auto max-w-5xl px-6 pt-10">
        <Reveal>
          <h3 className="heading-display text-center text-3xl leading-none md:text-5xl">Puedes encontrarnos en:</h3>
        </Reveal>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {canales.map(({ name, handle, url }, i) => (
            // Reveal solo anima la aparición; el estilo y el hover van en el enlace interno
            <Reveal as="li" key={name} delay={i * 100}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-5 transition duration-200 hover:-translate-y-1 hover:border-brand/60"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand text-white">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {icons[name]}
                  </svg>
                </span>
                <span>
                  <span className="block text-sm text-muted">{name}</span>
                  <span className="block text-lg font-semibold">{handle}</span>
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Contacto