import { Link } from "react-router"
import logo from "../imagenes/logo.png"
import { business } from "../data/business"
import Reveal from "../componentes/Reveal"
import Stripes from "../componentes/Stripes"
import TreadBackground from "../componentes/TreadBackground"

function Hero() {
  return (
    <section className="relative isolate overflow-hidden px-6 pb-24 pt-10 text-center md:pt-14">
      {/* Fondo: huellas de llanta + resplandor rojo + logo como marca de agua + franjas */}
      <TreadBackground />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "radial-gradient(ellipse at 50% 22%, rgba(225,29,46,.22), transparent 60%)" }}
      />
      <img
        src={logo}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 w-176 max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.05]"
      />
      <Stripes className="-bottom-4 -left-16" />
      <Stripes className="-right-16 top-8" />

      <Reveal>
        <img src={logo} alt={business.name} className="mx-auto w-64 md:w-96" />
      </Reveal>

      <Reveal delay={100}>
        <p className="heading-display mt-2 text-xl md:text-2xl">
          <span className="text-brand">100%</span> hechos de llanta de tractor
        </p>
      </Reveal>

      <Reveal delay={200}>
        <h1 className="heading-display mx-auto mt-6 max-w-3xl text-balance text-5xl leading-none md:text-7xl">
          Gomas de impacto para tu motocicleta
        </h1>
      </Reveal>

      <Reveal delay={300}>
        <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
          Repuestos y accesorios que convierten la fuerza de la llanta de tractor en resistencia que se nota.
        </p>
      </Reveal>

      <Reveal delay={400} className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          to="/productos"
          className="rounded-lg bg-brand px-7 py-3.5 font-semibold text-white shadow-lg shadow-red-900/30 transition duration-200 hover:scale-105 active:scale-95"
        >
          Ver catálogo
        </Link>
        <Link
          to="/cotizar"
          className="rounded-lg border border-line px-7 py-3.5 font-semibold text-white transition duration-200 hover:scale-105 hover:border-brand active:scale-95"
        >
          Cotizar mi pedido
        </Link>
      </Reveal>

      {/* Invitación a seguir bajando */}
      <Reveal delay={600} className="mt-14">
        <Link
          to={{ pathname: "/", hash: "#nosotros" }}
          aria-label="Conoce más sobre nosotros"
          className="mx-auto grid h-11 w-11 place-items-center rounded-full border border-line text-muted transition hover:border-brand hover:text-white"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 animate-bounce motion-reduce:animate-none" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </Link>
      </Reveal>
    </section>
  )
}

export default Hero