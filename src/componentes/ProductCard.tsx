import { Link } from "react-router"
import GomaImage from "./GomaImage"
import type { Product } from "../data/products"
import { business } from "../data/business"
import { formatMXN } from "../utils/cotizacion"

type ProductCardProps = {
  product: Product
  interactive: boolean // false cuando la tarjeta no es la central del carrusel
}

function ProductCard({ product, interactive }: ProductCardProps) {
  // Ej.: "5% desde 100 · 10% desde 500" (solo en las referencias con mayoreo)
  const mayoreo = business.wholesaleTiers.map((tier) => `${tier.percent}% Despues de ${tier.from} piezas`).join(" / ")

  return (
    <article className="flex h-full flex-col rounded-2xl border border-line bg-surface p-3 shadow-xl shadow-black/40">
      <GomaImage
        src={product.image}
        alt={`Goma de impacto REF-${product.ref}`}
        className="h-40 w-full"
        orb="-inset-3"
      />

      {/* Referencia y precio en la misma línea */}
      <div className="mt-3 flex items-baseline justify-between gap-2">
        <p className="heading-display text-xl text-brand">REF - {product.ref}</p>
        <p className="heading-display text-2xl leading-none">
          {formatMXN(product.price)}
          <span className="ml-1 text-xs font-normal normal-case not-italic text-muted">
            c/u {business.pricesIncludeIva ? "IVA incl." : "+ IVA"}
          </span>
        </p>
      </div>

      <ul className="mt-1 max-h-20 space-y-0.5 overflow-y-auto text-xs text-muted">
        {product.models.map((model) => (
          <li key={model}>{model}</li>
        ))}
      </ul>

      <div className="mt-auto pt-2">
        <p>
          Descuento de:
        </p>
        <p className="text-xs text-muted">
          {product.wholesale ? `${mayoreo}` : "Sin precio de mayoreo"}
        </p>

        <Link
          to={`/cotizar?ref=${product.ref}`}
          tabIndex={interactive ? 0 : -1}
          className="mt-2 block rounded-lg bg-brand px-4 py-2 text-center text-sm font-semibold text-white transition duration-200 hover:scale-[1.02] active:scale-95"
        >
          Cotizar esta referencia
        </Link>
      </div>
    </article>
  )
}

export default ProductCard