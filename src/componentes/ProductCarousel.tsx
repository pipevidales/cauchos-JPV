import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react"
import type { Product } from "../data/products"
import ProductCard from "./ProductCard"

const SPACING = 16 // rem entre el centro de una tarjeta y el de la siguiente

// Cómo se ve una tarjeta según su distancia a la central (0, 1, 2…)
const LOOKS = [
  { scale: 1, opacity: 1 },
  { scale: 0.88, opacity: 0.55 },
  { scale: 0.76, opacity: 0.2 },
]

function ProductCarousel({ products }: { products: Product[] }) {
  const [index, setIndex] = useState(0) // tarjeta que está al centro
  const startX = useRef<number | null>(null)
  const dragged = useRef(false)
  const total = products.length

  if (total === 0) return null

  const goTo = (i: number) => setIndex((i + total) % total) // da la vuelta al llegar al final
  const next = () => goTo(index + 1)
  const prev = () => goTo(index - 1)

  // Posición relativa a la tarjeta central: 0 = centro, -1 = izquierda, 1 = derecha…
  const offsetOf = (i: number) => {
    let d = i - index
    if (d > total / 2) d -= total
    if (d < -total / 2) d += total
    return d
  }

  // Deslizar con el dedo o el mouse
  const onPointerDown = (e: PointerEvent) => {
    startX.current = e.clientX
    dragged.current = false
  }
  const onPointerMove = (e: PointerEvent) => {
    if (startX.current !== null && Math.abs(e.clientX - startX.current) > 10) dragged.current = true
  }
  const onPointerUp = (e: PointerEvent) => {
    if (startX.current === null) return
    const dx = e.clientX - startX.current
    startX.current = null
    if (Math.abs(dx) > 50) {
      if (dx < 0) next()
      else prev()
    }
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault()
      next()
    } else if (e.key === "ArrowLeft") {
      e.preventDefault()
      prev()
    }
  }

  const arrow =
    "grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-line bg-surface transition duration-200 hover:border-brand hover:text-brand active:scale-95"

  return (
    <div
      role="region"
      aria-roledescription="carrusel"
      aria-label="Catálogo de productos"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-brand/60"
    >
      {/* Escenario: las tarjetas se apilan en el centro y se desplazan con transform */}
      <div
        className="relative h-154 touch-pan-y select-none overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (startX.current = null)}
      >
        {products.map((product, i) => {
          const offset = offsetOf(i)
          const dist = Math.abs(offset)
          const look = LOOKS[Math.min(dist, LOOKS.length - 1)]
          const visible = dist < LOOKS.length

          return (
            <div
              key={product.ref}
              aria-hidden={offset !== 0}
              onClick={() => {
                if (offset !== 0 && !dragged.current) goTo(i)
              }}
              className={`absolute left-1/2 top-2 h-148 w-72 transition-[transform,opacity] duration-500 ease-out motion-reduce:transition-none ${
                offset !== 0 ? "cursor-pointer" : ""
              } ${visible ? "" : "pointer-events-none"}`}
              style={{
                transform: `translateX(calc(-50% + ${offset * SPACING}rem)) scale(${look.scale})`,
                opacity: visible ? look.opacity : 0,
                zIndex: Math.max(0, 10 - dist),
              }}
            >
              <div className={offset !== 0 ? "pointer-events-none h-full" : "h-full"}>
                <ProductCard product={product} interactive={offset === 0} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Controles */}
      {total > 1 && (
        <div className="mt-4 flex items-center justify-center gap-4">
          <button type="button" onClick={prev} aria-label="Referencia anterior" className={arrow}>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {products.map((product, i) => (
              <button
                key={product.ref}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Ir a la referencia ${product.ref}`}
                aria-current={i === index}
                className={`h-2.5 cursor-pointer rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-brand" : "w-2.5 bg-line hover:bg-muted"
                }`}
              />
            ))}
          </div>

          <button type="button" onClick={next} aria-label="Referencia siguiente" className={arrow}>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      )}

      {/* Anuncio para lectores de pantalla */}
      <p className="sr-only" aria-live="polite">
        Referencia {products[index].ref}, {index + 1} de {total}
      </p>
    </div>
  )
}

export default ProductCarousel