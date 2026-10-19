import { Link } from "react-router"
import logo from "../imagenes/logo.jpg"
import banner from "../imagenes/hero-banner.jpg"
import { business } from "../data/business"

const badges = [
  {
    title: "Máxima resistencia",
    icon: (
      <>
        <path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5l8-3z" />
        <path d="M8.5 12l2.5 2.5 4.5-5" />
      </>
    ),
  },
  {
    title: "Mayor duración",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  },
  {
    title: "Reciclamos para un mejor futuro",
    icon: <path d="M21 12a9 9 0 0 1-15.5 6.2M3 12A9 9 0 0 1 18.5 5.8M18 2v4h-4M6 22v-4h4" />,
  },
  {
    title: "Calidad en cada producto",
    icon: (
      <>
        <circle cx="12" cy="12" r="3.5" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9L7 7M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" />
      </>
    ),
  },
]

function Hero() {
  return (
    <section className="relative isolate overflow-hidden px-6 pb-16 pt-10 text-center">
      {/* Resplandor rojo de fondo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "radial-gradient(ellipse at 50% 18%, rgba(225,29,46,.22), transparent 60%)" }}
      />

      <img src={logo} alt={business.name} className="fade-edges mx-auto w-72 md:w-104" />

      <p className="heading-display mt-2 text-xl md:text-2xl">
        <span className="text-brand">100%</span> hechos de llanta de tractor
      </p>

      <h1 className="heading-display mx-auto mt-6 max-w-3xl text-balance text-5xl leading-none md:text-7xl">
        Gomas de impacto para tu motocicleta
      </h1>

      <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
        Repuestos y accesorios que convierten la fuerza de la llanta de tractor en resistencia que se nota.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          to="/productos"
          className="rounded-lg bg-brand px-7 py-3.5 font-semibold text-white shadow-lg shadow-red-900/30 transition duration-200 hover:scale-105 active:scale-95"
        >
          Ver catálogo
        </Link>
        <Link
          to={{ pathname: "/", hash: "#mayoreo" }}
          className="rounded-lg border border-line px-7 py-3.5 font-semibold text-white transition duration-200 hover:scale-105 hover:border-brand active:scale-95"
        >
          Precios de mayoreo
        </Link>
      </div>

      <img src={banner} alt="Gomas de impacto sobre una moto" className="fade-edges mx-auto mt-10 w-full max-w-4xl" />

      <ul className="mx-auto mt-2 grid max-w-4xl grid-cols-2 gap-6 md:grid-cols-4">
        {badges.map(({ title, icon }) => (
          <li key={title} className="flex flex-col items-center gap-3">
            <span className="grid h-14 w-14 place-items-center rounded-full border-2 border-brand text-white">
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
                {icon}
              </svg>
            </span>
            <span className="heading-display text-base leading-tight">{title}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Hero