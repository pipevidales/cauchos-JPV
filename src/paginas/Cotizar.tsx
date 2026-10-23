import { useState } from "react"
import { useSearchParams } from "react-router"
import GomaImage from "../componentes/GomaImage"
import SectionHeading from "../componentes/SectionHeading"
import { business, whatsappLink } from "../data/business"
import { products } from "../data/products"
import { calcularCotizacion, construirMensaje, formatMXN, type Quantities } from "../utils/cotizacion"

function Cotizar() {
  // Si llegas desde /cotizar?ref=03, esa referencia arranca con el pedido mínimo
  const [params] = useSearchParams()
  const refInicial = params.get("ref")

  const [quantities, setQuantities] = useState<Quantities>(() =>
    refInicial && products.some((p) => p.ref === refInicial) ? { [refInicial]: business.minOrder } : {},
  )

  const quote = calcularCotizacion(quantities)

  // Limpia lo que escribe el cliente: solo enteros entre 0 y 99,999
  const setQty = (ref: string, value: number) =>
    setQuantities((prev) => ({ ...prev, [ref]: Math.min(99999, Math.max(0, Math.floor(value) || 0)) }))

  let estado: string
  if (quote.totalPieces === 0) {
    estado = `Elige las piezas que necesitas. Pedido mínimo: ${business.minOrder} piezas.`
  } else if (!quote.canSend) {
    estado = `Te faltan ${quote.missingForMin} piezas para el pedido mínimo (${business.minOrder}).`
  } else if (!quote.isWholesale) {
    estado = `Agrega ${quote.missingForWholesale} piezas más y cada una baja ${formatMXN(business.wholesaleDiscount)}.`
  } else {
    estado = "¡Precio de mayoreo aplicado!"
  }

  const ivaPct = Math.round(business.ivaRate * 100)

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <SectionHeading eyebrow="Cotizador" title="Arma tu pedido" />
      <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted">
        Elige las referencias y cantidades. Desde {business.wholesaleFrom} piezas (de cualquier referencia) cada pieza
        baja {formatMXN(business.wholesaleDiscount)}. Al final envías la cotización por WhatsApp para cerrar tu compra.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_22rem]">

        {/* Lista de referencias */}
        <ul className="space-y-3">
          {products.map((p) => {
            const qty = quantities[p.ref] || 0
            return (
              <li
                key={p.ref}
                className={`flex flex-wrap items-center gap-x-4 gap-y-3 rounded-2xl border bg-surface p-3 transition-colors ${
                  qty > 0 ? "border-brand/60" : "border-line"
                }`}
              >
                <GomaImage src={p.image} alt={`Goma de impacto REF-${p.ref}`} className="mx-2 h-20 w-20 shrink-0" orb="-inset-3" />

                <div className="min-w-0 flex-1 basis-40">
                  <p className="heading-display text-lg text-brand">REF - {p.ref}</p>
                  <p className="truncate text-sm text-muted" title={p.models.join(" · ")}>
                    {p.models.join(" · ")}
                  </p>
                  <p className="text-sm">
                    {quote.isWholesale && <span className="mr-2 text-muted line-through">{formatMXN(p.price)}</span>}
                    <span className="font-semibold">{formatMXN(p.price - quote.discount)}</span> c/u
                  </p>
                </div>

                {/* Cantidad: botones de ±10 y campo para escribir cualquier número */}
                <div className="ml-auto flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setQty(p.ref, qty - 10)}
                    aria-label={`Quitar 10 piezas de REF-${p.ref}`}
                    className="h-9 w-11 cursor-pointer rounded-lg border border-line text-sm font-semibold transition hover:border-brand active:scale-95"
                  >
                    −10
                  </button>
                  <input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    value={qty || ""}
                    placeholder="0"
                    onChange={(e) => setQty(p.ref, Number(e.target.value))}
                    aria-label={`Cantidad de piezas de REF-${p.ref}`}
                    className="h-9 w-20 rounded-lg border border-line bg-bg text-center focus:border-brand focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                  <button
                    type="button"
                    onClick={() => setQty(p.ref, qty + 10)}
                    aria-label={`Agregar 10 piezas de REF-${p.ref}`}
                    className="h-9 w-11 cursor-pointer rounded-lg border border-line text-sm font-semibold transition hover:border-brand active:scale-95"
                  >
                    +10
                  </button>
                </div>
              </li>
            )
          })}
        </ul>

        {/* Resumen */}
        <aside className="h-fit rounded-2xl border border-brand/40 bg-surface p-6 lg:sticky lg:top-24">
          <h2 className="heading-display text-2xl">Tu cotización</h2>
          <p className="mt-2 text-sm text-muted" aria-live="polite">
            {estado}
          </p>

          <dl className="mt-5 space-y-2 border-t border-line pt-5 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Piezas</dt>
              <dd className="font-semibold">{quote.totalPieces}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Subtotal</dt>
              <dd className="font-semibold">{formatMXN(quote.subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">IVA ({ivaPct}%)</dt>
              <dd className="font-semibold">{formatMXN(quote.iva)}</dd>
            </div>
            <div className="flex items-baseline justify-between border-t border-line pt-3">
              <dt className="text-base">Total</dt>
              <dd className="heading-display text-3xl">{formatMXN(quote.total)}</dd>
            </div>
            <div className="flex justify-between pt-1">
              <dt className="text-muted">Envío</dt>
              <dd className={`font-semibold ${quote.freeShipping ? "text-green-400" : ""}`}>
                {quote.freeShipping ? "Gratis" : "Se cotiza por WhatsApp"}
              </dd>
            </div>
          </dl>

          {!quote.freeShipping && (
            <p className="mt-3 text-xs text-muted">Envío gratis desde {business.freeShippingFrom} piezas.</p>
          )}

          {quote.canSend ? (
            <a
              href={whatsappLink(construirMensaje(quote))}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block rounded-lg bg-brand px-5 py-3.5 text-center font-semibold text-white shadow-lg shadow-red-900/30 transition duration-200 hover:scale-[1.02] active:scale-95"
            >
              Enviar cotización por WhatsApp
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="mt-6 block w-full cursor-not-allowed rounded-lg bg-line px-5 py-3.5 font-semibold text-muted"
            >
              Enviar cotización por WhatsApp
            </button>
          )}
        </aside>
      </div>
    </main>
  )
}

export default Cotizar