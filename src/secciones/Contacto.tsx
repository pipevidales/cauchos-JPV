import Reveal from "../componentes/Reveal"
import SectionBand from "../componentes/SectionBand"
import SocialIcon from "../componentes/SocialIcon"
import TreadBackground from "../componentes/TreadBackground"
import { business, whatsappLink } from "../data/business"

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
          <h3 className="heading-display text-center text-3xl leading-none md:text-5xl">Contáctanos</h3>
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
                <SocialIcon name={name} className="h-14 w-14" />
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