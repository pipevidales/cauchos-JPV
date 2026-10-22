import { useState } from "react"
import { Link } from "react-router"
import SectionHeading from "../componentes/SectionHeading"
import ProductCarousel from "../componentes/ProductCarousel"
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
    <main className="mx-auto max-w-6xl px-6 py-16">
      <SectionHeading eyebrow="Catálogo" title="Gomas de impacto" />
      <p className="mx-auto mt-4 max-w-xl text-center text-lg text-muted">
        Desliza para ver las referencias y encuentra la que le queda a tu moto.
      </p>

      <label className="mx-auto mt-8 block max-w-md">
        <span className="sr-only">Buscar modelo de moto</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Busca tu modelo: Pulsar, Italika, CB 160…"
          className="w-full rounded-lg border border-line bg-surface px-4 py-3 placeholder:text-muted focus:border-brand focus:outline-none"
        />
      </label>

      <div className="mt-6">
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

      <div className="mt-10 text-center">
        <p className="text-sm text-muted">
          Pedido mínimo de {business.minOrder} piezas · mayoreo desde {business.wholesaleFrom}
        </p>
        <Link
          to="/cotizar"
          className="mt-4 inline-block rounded-lg border border-line px-7 py-3.5 font-semibold transition duration-200 hover:scale-105 hover:border-brand active:scale-95"
        >
          Armar mi cotización
        </Link>
      </div>
    </main>
  )
}

export default Productos