import type { ReactNode } from "react"
import banner from "../imagenes/hero-banner.jpg"
import Reveal from "../componentes/Reveal"
import SectionHeading from "../componentes/SectionHeading"
import TreadBackground from "../componentes/TreadBackground"

const valores = ["Reciclamos", "Transformamos", "Creamos"]

const ventajas: { title: string; text: string; icon: ReactNode }[] = [
  {
    title: "Máxima resistencia",
    text: "Un material altamente resistente.",
    icon: (
      <>
        <path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5l8-3z" />
        <path d="M8.5 12l2.5 2.5 4.5-5" />
      </>
    ),
  },
  {
    title: "Mayor duración",
    text: "Calidad que perdura.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  },
  {
    title: "Reciclamos para un mejor futuro",
    text: "Le damos nueva vida a la llanta de tractor.",
    icon: <path d="M21 12a9 9 0 0 1-15.5 6.2M3 12A9 9 0 0 1 18.5 5.8M18 2v4h-4M6 22v-4h4" />,
  },
  {
    title: "Calidad en cada producto",
    text: "Funcional y confiable.",
    icon: (
      <>
        <circle cx="12" cy="12" r="3.5" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9L7 7M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" />
      </>
    ),
  },
]

function Nosotros() {
  return (
    <section id="nosotros" className="relative isolate overflow-hidden border-y border-line bg-surface/40 py-24">
      <TreadBackground />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        {/* Imagen a la izquierda, con marco rojo desplazado */}
        <Reveal from="left" className="relative h-72 sm:h-96 lg:h-104">
          <div aria-hidden="true" className="absolute -bottom-3 -left-3 h-full w-full rounded-2xl border-2 border-brand/50" />
          <img
            src={banner}
            alt="Gomas de impacto junto a una moto"
            className="absolute inset-0 h-full w-full rounded-2xl border border-line object-cover object-center"
          />
        </Reveal>

        {/* Texto + ventajas a la derecha */}
        <div>
          <Reveal>
            <SectionHeading align="left" eyebrow="Nosotros" title="Resistencia que se transforma en calidad" />
          </Reveal>

          <Reveal delay={100}>
            <ul className="mt-6 flex flex-wrap gap-2">
              {valores.map((valor, i) => (
                <li
                  key={valor}
                  className={`rounded-full border px-4 py-1.5 text-sm font-semibold uppercase tracking-wide ${
                    i === valores.length - 1 ? "border-brand text-brand" : "border-line"
                  }`}
                >
                  {valor}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={150} className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
            <p>
              En Cauchos JPV convertimos la fuerza de la llanta de tractor en productos diseñados para resistir,
              durar y cumplir.
            </p>
            <p>
              Cada una de nuestras gomas de impacto es 100% hecha de llanta de tractor, para darle una nueva vida
              y transformarla en un producto funcional y confiable.
            </p>
          </Reveal>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {ventajas.map(({ title, text, icon }, i) => (
              <Reveal
                as="li"
                key={title}
                delay={200 + i * 100}
                className="flex gap-3 rounded-xl border border-line bg-bg/60 p-4 transition-colors duration-200 hover:border-brand/60"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-brand text-white">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {icon}
                  </svg>
                </span>
                <span>
                  <span className="heading-display block text-lg leading-tight">{title}</span>
                  <span className="mt-0.5 block text-sm text-muted">{text}</span>
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Nosotros