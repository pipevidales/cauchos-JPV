import { Link } from "react-router"
import Reveal from "../componentes/Reveal"
import SectionBand from "../componentes/SectionBand"
import TreadBackground from "../componentes/TreadBackground"
import { business } from "../data/business"

function ComoComprar() {
  const pasos = [
    {
      n: "1",
      title: "Elige tus referencias",
      text: "Busca el modelo de tu moto en el catálogo y encuentra la goma que le queda.",
      cta: "Ver catálogo",
      to: "/productos",
    },
    {
      n: "2",
      title: "Arma tu cotización",
      text: `Indica cuántas piezas necesitas (mínimo ${business.minOrder}) y mira el total con IVA al instante.`,
      cta: "Ir al cotizador",
      to: "/cotizar",
    },
    {
      n: "3",
      title: "Confirma por WhatsApp",
      text: "Te llega la cotización lista por mensaje para cuadrar el pago y el envío con nosotros.",
    },
  ]

  const ctaClass =
    "mt-4 inline-block rounded-full border border-brand/60 px-5 py-1.5 text-sm font-semibold text-white transition duration-200 hover:bg-brand active:scale-95"

  return (
    <section id="como-comprar" className="relative isolate overflow-hidden pb-16">
      <TreadBackground variant="glow" />

      {/* Barra roja a todo el ancho, igual que en Nosotros */}
      <SectionBand>Cómo comprar</SectionBand>

      <div className="mx-auto max-w-6xl px-6 pt-10">
        <Reveal>
          <h3 className="heading-display text-3xl leading-none md:text-5xl">Tu pedido en tres pasos</h3>
        </Reveal>

        <ol className="relative mt-10 grid gap-8 md:grid-cols-3">
          {/* Línea que une los tres círculos (solo en pantallas anchas) */}
          <div
            aria-hidden="true"
            className="absolute left-[calc((100%_-_4rem)/6)] right-[calc((100%_-_4rem)/6)] top-7 hidden h-0.5 bg-linear-to-r from-brand/20 via-brand/60 to-brand/20 md:block"
          />

          {pasos.map((paso, i) => (
            // Reveal solo anima la aparición; el estilo y el hover van en el div interno
            <Reveal as="li" key={paso.n} delay={i * 150}>
              <div className="flex h-full flex-col items-center">
                <span className="heading-display relative z-10 grid h-14 w-14 place-items-center rounded-full border-2 border-brand bg-bg text-2xl shadow-lg shadow-red-950/40">
                  {paso.n}
                </span>

                <div className="mt-4 flex w-full flex-1 flex-col items-center rounded-2xl border border-line bg-surface p-6 text-center transition-colors duration-200 hover:border-brand/60">
                  <h4 className="heading-display text-2xl leading-tight">{paso.title}</h4>
                  <p className="mt-2 flex-1 text-muted">{paso.text}</p>
                  {paso.to && (
                    <Link to={paso.to} className={ctaClass}>
                      {paso.cta} →
                    </Link>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default ComoComprar