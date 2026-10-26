import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router"
import logo from "../imagenes/logo.png"
import { business, whatsappLink } from "../data/business"

type NavItem = {
  label: string
  path: string
  hash: string // sección dentro de la página de inicio (vacío = parte superior)
  sections?: string[] // ids de las secciones del inicio que encienden este enlace al pasar por ellas
}

const links: NavItem[] = [
  { label: "Inicio", path: "/", hash: "", sections: ["inicio"] },
  { label: "Nosotros", path: "/", hash: "#nosotros", sections: ["nosotros"] },
  { label: "Cómo comprar - Mayoreo", path: "/", hash: "#como-comprar", sections: ["como-comprar", "mayoreo"] },
  { label: "Productos", path: "/productos", hash: "" },
  { label: "Cotizar", path: "/cotizar", hash: "" },
  // Un solo enlace que se enciende en las dos secciones
  
  { label: "Contacto", path: "/", hash: "#contacto", sections: ["contacto"] },
]

// Secciones del inicio, de arriba hacia abajo (deben coincidir con el id de cada <section>)
const sectionIds = ["inicio", "nosotros", "como-comprar", "mayoreo", "contacto"]

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(() => window.scrollY > 24)
  const [activeSection, setActiveSection] = useState("inicio")
  const { pathname } = useLocation()

  // Detecta si la página ya bajó un poco para compactar el navbar
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // En el inicio: averigua por qué sección vas pasando para encender su enlace
  useEffect(() => {
    if (pathname !== "/") return

    const update = () => {
      const line = window.innerHeight * 0.4 // la sección "activa" es la última cuyo borde superior ya subió de este punto
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4

      let current = sectionIds[0]
      if (atBottom) {
        current = sectionIds[sectionIds.length - 1] // al final de la página, la última
      } else {
        for (const id of sectionIds) {
          const el = document.getElementById(id)
          if (el && el.getBoundingClientRect().top <= line) current = id
        }
      }
      setActiveSection(current)
    }

    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame) // una sola actualización por cuadro: no pesa al hacer scroll
      frame = requestAnimationFrame(update)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [pathname])

  const closeMenu = () => setIsMenuOpen(false)
  const solid = scrolled || isMenuOpen

  // En el inicio, el enlace se enciende si la sección que vas viendo está en su lista "sections"
  const isActive = (item: NavItem) =>
    item.sections ? pathname === "/" && item.sections.includes(activeSection) : pathname === item.path

  const desktopLink = (active: boolean) =>
    `relative font-medium transition-all duration-300
     after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:rounded-full after:bg-brand after:transition-transform after:duration-200
     ${scrolled ? "text-sm" : "text-base"}
     ${active ? "text-white after:scale-x-100" : "text-muted after:scale-x-0 hover:text-white hover:after:scale-x-100"}`

  return (
    // "fixed": al achicarse no mueve el contenido de la página
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-all duration-300 ${
        solid ? "border-line bg-bg/85 backdrop-blur-md" : "border-transparent bg-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between px-6 transition-all duration-300 ${
          scrolled ? "py-1.5" : "py-3 md:py-4"
        }`}
      >
        {/* Logo: lleva al inicio */}
        <Link to="/" onClick={closeMenu} aria-label={`${business.name} - Ir al inicio`}>
          <img
            src={logo}
            alt={business.name}
            className={`w-auto transition-all duration-300 ${scrolled ? "h-9 md:h-10" : "h-12 md:h-16"}`}
          />
        </Link>

        {/* Links de escritorio */}
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Principal">
          {links.map((item) => (
            <Link
              key={item.label}
              to={{ pathname: item.path, hash: item.hash }}
              aria-current={isActive(item) ? "page" : undefined}
              className={desktopLink(isActive(item))}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white transition duration-200 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            WhatsApp
          </a>

          {/* Botón del menú móvil */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="-mr-1.5 cursor-pointer rounded-lg p-1.5 text-zinc-300 transition hover:bg-surface hover:text-white lg:hidden"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {isMenuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <nav id="mobile-menu" aria-label="Móvil" className="border-t border-line bg-bg/95 px-6 py-3 lg:hidden">
          <div className="flex flex-col">
            {links.map((item) => (
              <Link
                key={item.label}
                to={{ pathname: item.path, hash: item.hash }}
                onClick={closeMenu}
                aria-current={isActive(item) ? "page" : undefined}
                className={`rounded-lg py-3 text-center transition-colors duration-200 hover:bg-surface hover:text-white ${
                  isActive(item)
                    ? "font-semibold text-white underline decoration-brand decoration-2 underline-offset-8"
                    : "text-muted"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}

export default Navbar