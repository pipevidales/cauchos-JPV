import { useState } from "react"
import { Link } from "react-router"
import ProductCarousel from "../componentes/ProductCarousel"
import Reveal from "../componentes/Reveal"
import SectionBand from "../componentes/SectionBand"
import { business, whatsappLink } from "../data/business"
import { products } from "../data/products"

function Productos() {
  const [query, setQuery] = useState("")
  const q = query.trim().toLowerCase()

  // Busca por número de referencia o por modelo de moto
  const filtered = products.filter(
    (p) => !q || `ref-${p.ref} ref ${p.ref} ${p.models.join(" ")}`.toLowerCase().includes(q),
  )

  return (
    <main>
      {/* Barra roja a todo el ancho, igual que en las secciones del inicio */}
      <SectionBand>Catálogo</SectionBand>

      <div className="mx-auto max-w-6xl px-6 pb-12 pt-8">
        {/* Título a la izquierda y buscador a la derecha: ahorra espacio vertical */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <h3 className="heading-display text-3xl leading-none md:text-5xl">Gomas de impacto</h3>
            <p className="mt-2 text-muted">Desliza para ver las referencias y encuentra la que le queda a tu moto.</p>
          </Reveal>

          <label className="block w-full lg:max-w-sm">
            <span className="sr-only">Buscar modelo de moto</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Busca tu modelo: Pulsar, Italika, CB 160…"
              className="w-full rounded-lg border border-line bg-surface px-4 py-3 placeholder:text-muted focus:border-brand focus:outline-none"
            />
          </label>
        </div>

        <div className="mt-4">
          {/* "key" reinicia el carrusel cada vez que cambia la búsqueda */}
          <ProductCarousel key={q} products={filtered} />

          {filtered.length === 0 && (
            <p className="py-16 text-center text-muted">
              No encontramos ese modelo en el catálogo.{" "}
              <a
                href={whatsappLink(`Hola, busco una goma de impacto para: ${query.trim()}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand hover:underline"
              >
                Escríbenos por WhatsApp
              </a>{" "}
              y lo consultamos.
            </p>
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <p className="text-sm text-muted">
            Pedido mínimo de {business.minOrder} piezas · mayoreo desde {business.wholesaleFrom} piezas en adelante
          </p>
          <Link
            to="/cotizar"
            className="rounded-lg border border-line px-6 py-2.5 font-semibold transition duration-200 hover:scale-105 hover:border-brand active:scale-95"
          >
            Armar mi cotización
          </Link>
        </div>
      </div>
    </main>
  )
}

export default Productos