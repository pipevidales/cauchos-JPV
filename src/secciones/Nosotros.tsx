import type { ReactNode } from "react"
import banner from "../imagenes/logo.png"
import Reveal from "../componentes/Reveal"
import SectionBand from "../componentes/SectionBand"
import TreadBackground from "../componentes/TreadBackground"

// Cada valor con su color (las clases van completas para que Tailwind las detecte)
const valores = [
  { label: "Reciclamos", style: "border-green-500/60 bg-green-500/10 text-green-400" },
  { label: "Transformamos", style: "border-blue-500/60 bg-blue-500/10 text-blue-400" },
  { label: "Creamos", style: "border-white/70 bg-white/10 text-white" },
]

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
    text: "Nueva vida a la llanta de tractor.",
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
    <section id="nosotros" className="relative isolate overflow-hidden border-b border-line bg-surface/40 pb-12">
      <TreadBackground />

      {/* Barra roja a todo el ancho con el nombre de la sección */}
      <SectionBand>Nosotros</SectionBand>

      <div className="mx-auto max-w-6xl px-6 pt-10">
        {/* Imagen (más pequeña) y texto, con la misma altura */}
        <div className="grid items-stretch gap-8 lg:grid-cols-[5fr_7fr] lg:gap-12">
          <Reveal from="left" className="relative h-60 sm:h-72 lg:h-auto lg:min-h-64">
            <div aria-hidden="true" className="absolute -bottom-2 -left-2 h-full w-full rounded-2xl border-2 border-brand/50" />
            <img
              src={banner}
              alt="Gomas de impacto junto a una moto"
              className="absolute inset-0 h-full w-full rounded-2xl border border-line object-cover object-center"
            />
          </Reveal>

          <div className="flex flex-col justify-center">
            <Reveal>
              <h3 className="heading-display text-3xl leading-none md:text-5xl">
                Resistencia que se transforma en calidad
              </h3>
            </Reveal>

            <Reveal delay={100}>
              <ul className="mt-5 flex flex-wrap gap-2">
                {valores.map(({ label, style }) => (
                  <li
                    key={label}
                    className={`rounded-full border px-4 py-1.5 text-sm font-semibold uppercase tracking-wide ${style}`}
                  >
                    {label}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={150} className="mt-5 space-y-3 leading-relaxed text-muted">
              <p>
                En Cauchos JPV convertimos la fuerza de la llanta de tractor en productos diseñados para resistir,
                durar y cumplir.
              </p>
              <p>
                Cada una de nuestras gomas de impacto es 100% hecha de llanta de tractor, para darle una nueva vida
                y transformarla en un producto funcional y confiable.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Ventajas: fila compacta, para que todo se vea en una sola pantalla */}
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ventajas.map(({ title, text, icon }, i) => (
            // Reveal solo anima la aparición; el estilo y el hover van en el div interno
            <Reveal as="li" key={title} delay={i * 120}>
              <div className="flex h-full items-center gap-3 rounded-xl border border-line bg-bg/60 p-4 transition-colors duration-200 hover:border-brand/60">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-brand text-white">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {icon}
                  </svg>
                </span>
                <div>
                  <p className="heading-display text-base leading-tight">{title}</p>
                  <p className="mt-0.5 text-sm text-muted">{text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Nosotros