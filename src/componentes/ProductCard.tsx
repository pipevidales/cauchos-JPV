import { Link } from "react-router"
import type { Product } from "../data/products"
import { business } from "../data/business"
import { formatMXN } from "../utils/cotizacion"

type ProductCardProps = {
  product: Product
  interactive: boolean // false cuando la tarjeta no es la central del carrusel
}

function ProductCard({ product, interactive }: ProductCardProps) {
  const wholesalePrice = product.price - business.wholesaleDiscount

  return (
    <article className="flex h-full flex-col rounded-2xl border border-line bg-surface p-4 shadow-xl shadow-black/40">
      <img
        src={product.image}
        alt={`Goma de impacto REF-${product.ref}`}
        draggable={false}
        className="goma-plate aspect-square w-full rounded-xl object-contain p-2"
      />

      <p className="heading-display mt-4 text-2xl text-brand">REF - {product.ref}</p>

      <ul className="mt-2 space-y-0.5 text-sm text-muted">
        {product.models.map((model) => (
          <li key={model}>{model}</li>
        ))}
      </ul>

      <div className="mt-auto pt-4">
        <p className="flex items-baseline gap-2">
          <span className="heading-display text-3xl">{formatMXN(product.price)}</span>
          <span className="text-sm text-muted">c/u {business.pricesIncludeIva ? "IVA incluido" : "+ IVA"}</span>
        </p>
        <p className="text-xs text-muted">
          Desde {business.wholesaleFrom} piezas: {formatMXN(wholesalePrice)} c/u
        </p>

        <Link
          to={`/cotizar?ref=${product.ref}`}
          tabIndex={interactive ? 0 : -1}
          className="mt-3 block rounded-lg bg-brand px-4 py-2.5 text-center font-semibold text-white transition duration-200 hover:scale-[1.02] active:scale-95"
        >
          Cotizar esta referencia
        </Link>
      </div>
    </article>
  )
}

export default ProductCard