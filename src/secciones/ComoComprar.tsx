import { Link } from "react-router"
import Reveal from "../componentes/Reveal"
import SectionHeading from "../componentes/SectionHeading"
import { business, whatsappLink } from "../data/business"

function ComoComprar() {
  const pasos = [
    {
      n: "01",
      title: "Elige tus referencias",
      text: "Busca el modelo de tu moto en el catálogo y encuentra la goma que le queda.",
      cta: "Ver catálogo",
      to: "/productos",
    },
    {
      n: "02",
      title: "Arma tu cotización",
      text: `Indica cuántas piezas necesitas (mínimo ${business.minOrder}) y mira el total con IVA al instante.`,
      cta: "Ir al cotizador",
      to: "/cotizar",
    },
    {
      n: "03",
      title: "Confirma por WhatsApp",
      text: "Te llega la cotización lista por mensaje para cuadrar el pago y el envío con nosotros.",
      cta: "Escribir ahora",
      href: whatsappLink("Hola, quiero hacer un pedido de gomas de impacto"),
    },
  ]

  const linkClass = "mt-5 inline-block font-semibold text-brand transition hover:translate-x-1"

  return (
    <section id="como-comprar" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <SectionHeading eyebrow="Cómo comprar" title="Tu pedido en tres pasos" />
      </Reveal>

      <ol className="mt-12 grid gap-6 md:grid-cols-3">
        {pasos.map((paso, i) => (
          <Reveal
            as="li"
            key={paso.n}
            delay={i * 150}
            className="relative overflow-hidden rounded-2xl border border-line bg-surface p-7 transition-colors duration-200 hover:border-brand/60"
          >
            <span aria-hidden="true" className="heading-display absolute -right-2 -top-4 text-8xl text-brand/15">
              {paso.n}
            </span>
            <h3 className="heading-display relative text-2xl">{paso.title}</h3>
            <p className="relative mt-3 text-muted">{paso.text}</p>
            {paso.to ? (
              <Link to={paso.to} className={`relative ${linkClass}`}>
                {paso.cta} →
              </Link>
            ) : (
              <a href={paso.href} target="_blank" rel="noopener noreferrer" className={`relative ${linkClass}`}>
                {paso.cta} →
              </a>
            )}
          </Reveal>
        ))}
      </ol>
    </section>
  )
}

export default ComoComprar