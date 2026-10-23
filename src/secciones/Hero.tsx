import { Link } from "react-router"
import banner from "../imagenes/hero-banner.jpg"
import Reveal from "../componentes/Reveal"

function Hero() {
  return (
    // Pantalla completa, con el contenido alineado a la izquierda sobre una imagen de fondo
    <section className="relative isolate flex min-h-svh items-center overflow-hidden px-6 pb-16 pt-32">
      {/* Imagen de fondo y degradados: oscurecen la izquierda para que el texto se lea bien */}
      <img
        src={banner}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[72%_center]"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-r from-bg via-bg/80 to-bg/10" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-bg via-transparent to-bg/50" />

      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <p className="inline-flex items-center gap-2 rounded-full border border-brand/50 bg-brand/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-brand" />
            100% hechos de llanta de tractor
          </p>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="heading-display mt-6 max-w-4xl text-balance text-6xl leading-[0.92] sm:text-7xl md:text-8xl">
            Gomas de impacto para tu motocicleta
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-zinc-200">
            Repuestos y accesorios que convierten la fuerza de la llanta de tractor en resistencia que se nota.
          </p>
        </Reveal>

        {/* Botones a la izquierda y enlace a la derecha, como en la referencia */}
        <Reveal delay={300} className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-3">
            <Link
              to="/cotizar"
              className="rounded-full bg-white px-7 py-3.5 font-semibold text-black transition duration-200 hover:scale-105 active:scale-95"
            >
              Cotizar mi pedido
            </Link>
            <Link
              to="/productos"
              className="rounded-full border-2 border-white/80 px-7 py-3 font-semibold text-white transition duration-200 hover:bg-white hover:text-black active:scale-95"
            >
              Ver catálogo
            </Link>
          </div>

          <Link
            to={{ pathname: "/", hash: "#nosotros" }}
            className="inline-flex items-center gap-2 font-semibold text-white/90 transition hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
              <path d="M7 4l13 8-13 8z" />
            </svg>
            Mas sobre nosotros
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

export default Hero