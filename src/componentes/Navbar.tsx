import { useState } from "react"
import { Link, useLocation } from "react-router"
import logo from "../imagenes/logo.jpg"
import { business, whatsappLink } from "../data/business"

// "hash" es la sección dentro de la página de inicio (vacío = parte superior)
const links = [
  { label: "Inicio", path: "/", hash: "" },
  { label: "Nosotros", path: "/", hash: "#nosotros" },
  { label: "Productos", path: "/productos", hash: "" },
  { label: "Mayoreo", path: "/", hash: "#mayoreo" },
  { label: "Contacto", path: "/", hash: "#contacto" },
]

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { pathname, hash } = useLocation()

  const closeMenu = () => setIsMenuOpen(false)
  const isActive = (path: string, anchor: string) => pathname === path && hash === anchor

  const desktopLink = (active: boolean) =>
    `relative text-sm font-medium transition-colors duration-200
     after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:rounded-full after:bg-brand after:transition-transform after:duration-200
     ${active ? "text-white after:scale-x-100" : "text-muted after:scale-x-0 hover:text-white hover:after:scale-x-100"}`

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2">

        {/* Logo: lleva al inicio */}
        <Link to="/" onClick={closeMenu} aria-label={`${business.name} - Ir al inicio`}>
          <img src={logo} alt={business.name} className="h-12 w-auto rounded-md" />
        </Link>

        {/* Links de escritorio */}
        <nav className="hidden items-center gap-7 md:flex" aria-label="Principal">
          {links.map(({ label, path, hash: anchor }) => (
            <Link
              key={label}
              to={{ pathname: path, hash: anchor }}
              className={desktopLink(isActive(path, anchor))}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            WhatsApp
          </a>

          {/* Botón del menú móvil */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="-mr-1.5 cursor-pointer rounded-lg p-1.5 text-zinc-300 transition hover:bg-surface hover:text-white md:hidden"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg
              aria-hidden="true"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {isMenuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <nav id="mobile-menu" aria-label="Móvil" className="border-t border-line bg-bg/95 px-6 py-3 md:hidden">
          <div className="flex flex-col">
            {links.map(({ label, path, hash: anchor }) => (
              <Link
                key={label}
                to={{ pathname: path, hash: anchor }}
                onClick={closeMenu}
                className={`rounded-lg py-3 text-center transition-colors duration-200 hover:bg-surface hover:text-white ${
                  isActive(path, anchor) ? "font-semibold text-white" : "text-muted"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}

export default Navbar