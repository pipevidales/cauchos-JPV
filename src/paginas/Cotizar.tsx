import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"
import GomaImage from "../componentes/GomaImage"
import Reveal from "../componentes/Reveal"
import SectionBand from "../componentes/SectionBand"
import { business, whatsappLink } from "../data/business"
import { products } from "../data/products"
import {
  calcularCotizacion,
  construirMensaje,
  formatMXN,
  siguienteMeta,
  type Quantities,
} from "../utils/cotizacion"

const STORAGE_KEY = "cauchos-jpv-pedido"

// Lee el pedido guardado en el navegador, aceptando solo referencias y cantidades válidas
function loadSaved(): { quantities: Quantities; city: string } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const data = JSON.parse(raw)
      const quantities: Quantities = {}
      for (const p of products) {
        const n = Number(data?.quantities?.[p.ref])
        if (Number.isFinite(n) && n > 0) quantities[p.ref] = Math.min(99999, Math.floor(n))
      }
      return { quantities, city: typeof data?.city === "string" ? data.city.slice(0, 60) : "" }
    }
  } catch {
    // si el navegador no permite guardar o el dato está dañado, se empieza con el pedido vacío
  }
  return { quantities: {}, city: "" }
}

// Botón de enviar: activo solo cuando el pedido llega al mínimo
function SendButton({ enabled, href, label, compact = false }: { enabled: boolean; href: string; label: string; compact?: boolean }) {
  const size = compact ? "px-4 py-2.5 text-sm" : "w-full px-5 py-3.5"

  if (!enabled) {
    return (
      <button type="button" disabled className={`cursor-not-allowed rounded-lg bg-line font-semibold text-muted ${size}`}>
        {label}
      </button>
    )
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`block rounded-lg bg-brand text-center font-semibold text-white shadow-lg shadow-red-900/30 transition duration-200 hover:scale-[1.02] active:scale-95 ${size}`}
    >
      {label}
    </a>
  )
}

function Cotizar() {
  // Si llegas desde /cotizar?ref=03, esa referencia arranca con el pedido mínimo
  const [params] = useSearchParams()
  const refInicial = params.get("ref")

  const [quantities, setQuantities] = useState<Quantities>(() => {
    const saved = loadSaved().quantities
    if (refInicial && products.some((p) => p.ref === refInicial) && !saved[refInicial]) {
      return { ...saved, [refInicial]: business.minOrder }
    }
    return saved
  })
  const [city, setCity] = useState(() => loadSaved().city)

  // Guarda el pedido para que no se pierda al recargar o volver más tarde
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ quantities, city }))
    } catch {
      // sin guardado: la cotización sigue funcionando normal
    }
  }, [quantities, city])

  const quote = calcularCotizacion(quantities)
  const meta = siguienteMeta(quote.totalPieces)
  const progress = Math.min(100, Math.round((quote.totalPieces / meta.goal) * 100))
  const whatsapp = whatsappLink(construirMensaje(quote, city))
  const ivaPct = Math.round(business.ivaRate * 100)

  // Limpia lo que escribe el cliente: solo enteros entre 0 y 99,999
  const setQty = (ref: string, value: number) =>
    setQuantities((prev) => ({ ...prev, [ref]: Math.min(99999, Math.max(0, Math.floor(value) || 0)) }))

  const estado =
    quote.totalPieces === 0
      ? `Elige las piezas que necesitas. Pedido mínimo: ${business.minOrder} piezas.`
      : meta.text

  return (
    <main>
      {/* Barra roja a todo el ancho, igual que en el resto de la página */}
      <SectionBand>Cotizador</SectionBand>

      <div className="mx-auto max-w-6xl px-6 pb-16 pt-10">
        <Reveal>
          <h3 className="heading-display text-3xl leading-none md:text-5xl">Arma tu pedido</h3>
        </Reveal>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Elige las referencias y cantidades. Desde {business.wholesaleFrom} piezas (de cualquier referencia) cada
          pieza baja {formatMXN(business.wholesaleDiscount)}. Al final envías la cotización por WhatsApp para cerrar
          tu compra.
        </p>

        {/* Destino (opcional) y limpiar pedido */}
        <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
          <label className="block w-full max-w-sm">
            <span className="mb-1 block text-sm text-muted">¿A dónde enviamos? (opcional)</span>
            <input
              type="text"
              value={city}
              maxLength={60}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Ciudad y estado, ej. Torreón, Coahuila"
              className="w-full rounded-lg border border-line bg-surface px-4 py-2.5 placeholder:text-muted focus:border-brand focus:outline-none"
            />
          </label>
          <button
            type="button"
            onClick={() => setQuantities({})}
            disabled={quote.totalPieces === 0}
            className="cursor-pointer rounded-full border border-line px-5 py-2 text-sm font-semibold transition hover:border-brand disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line"
          >
            Limpiar pedido
          </button>
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_22rem]">
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
                  <GomaImage
                    src={p.image}
                    alt={`Goma de impacto REF-${p.ref}`}
                    className="mx-2 h-20 w-20 shrink-0"
                    orb="-inset-3"
                  />

                  <div className="min-w-0 flex-1 basis-40">
                    <p className="heading-display text-lg text-brand">REF - {p.ref}</p>
                    <p className="truncate text-sm text-muted" title={p.models.join(" · ")}>
                      {p.models.join(" · ")}
                    </p>
                    <p className="text-sm">
                      {quote.isWholesale && (
                        <span className="mr-2 text-muted line-through">{formatMXN(p.price)}</span>
                      )}
                      <span className="font-semibold">{formatMXN(p.price - quote.discount)}</span> c/u
                    </p>
                  </div>

                  <div className="ml-auto flex flex-col items-end gap-1.5">
                    {/* Cantidad: ±10 y campo para escribir cualquier número */}
                    <div className="flex items-center gap-1">
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

                    {/* Atajos para pedidos grandes */}
                    <div className="flex gap-1 text-xs">
                      {[20, 100].map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setQty(p.ref, qty + n)}
                          aria-label={`Agregar ${n} piezas de REF-${p.ref}`}
                          className="cursor-pointer rounded-full border border-line px-2.5 py-0.5 font-semibold text-muted transition hover:border-brand hover:text-white active:scale-95"
                        >
                          +{n}
                        </button>
                      ))}
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>

          {/* Resumen */}
          <aside className="h-fit rounded-2xl border border-brand/40 bg-surface p-6 lg:sticky lg:top-24">
            <h2 className="heading-display text-2xl">Tu cotización</h2>

            {/* Barra de progreso hacia el siguiente beneficio */}
            <div
              className="mt-4 h-2 overflow-hidden rounded-full bg-line"
              role="progressbar"
              aria-label="Avance hacia el siguiente beneficio"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
            >
              <div className="h-full rounded-full bg-brand transition-[width] duration-500" style={{ width: `${progress}%` }} />
            </div>
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
              {city.trim() && (
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Destino</dt>
                  <dd className="text-right font-semibold">{city.trim()}</dd>
                </div>
              )}
            </dl>

            <div className="mt-6">
              <SendButton enabled={quote.canSend} href={whatsapp} label="Enviar cotización por WhatsApp" />
            </div>
          </aside>
        </div>
      </div>

      {/* Barra fija en celular: el total y el botón siempre a la vista mientras recorres la lista */}
      <div className="sticky bottom-0 z-30 border-t border-line bg-bg/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden">
        <div className="h-1 bg-line">
          <div className="h-full bg-brand transition-[width] duration-500" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <div>
            <p className="text-xs text-muted">{quote.totalPieces} piezas · total con IVA</p>
            <p className="heading-display text-2xl leading-none">{formatMXN(quote.total)}</p>
          </div>
          <SendButton compact enabled={quote.canSend} href={whatsapp} label="Enviar por WhatsApp" />
        </div>
      </div>
    </main>
  )
}

export default Cotizar