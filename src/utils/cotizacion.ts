import { business } from "../data/business"
import { products } from "../data/products"

// Cantidades que escribe el cliente: { "01": 50, "03": 60 }
export type Quantities = Record<string, number>

const round2 = (n: number) => Math.round(n * 100) / 100

export function formatMXN(value: number) {
  return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(value)
}

// Toda la lógica de precios vive aquí, separada de la pantalla
export function calcularCotizacion(quantities: Quantities) {
  const totalPieces = products.reduce((sum, p) => sum + (quantities[p.ref] || 0), 0)
  const isWholesale = totalPieces >= business.wholesaleFrom
  const discount = isWholesale ? business.wholesaleDiscount : 0

  const lines = products
    .filter((p) => (quantities[p.ref] || 0) > 0)
    .map((product) => {
      const qty = quantities[product.ref]
      const unitPrice = product.price - discount
      return { product, qty, unitPrice, amount: unitPrice * qty }
    })

  const base = lines.reduce((sum, l) => sum + l.amount, 0)
  const rate = business.ivaRate
  const subtotal = business.pricesIncludeIva ? round2(base / (1 + rate)) : base
  const total = business.pricesIncludeIva ? base : round2(base * (1 + rate))
  const iva = round2(total - subtotal)

  return {
    lines,
    totalPieces,
    isWholesale,
    discount,
    subtotal,
    iva,
    total,
    freeShipping: totalPieces >= business.freeShippingFrom,
    canSend: totalPieces >= business.minOrder,
    missingForMin: Math.max(0, business.minOrder - totalPieces),
    missingForWholesale: Math.max(0, business.wholesaleFrom - totalPieces),
  }
}

export type Quote = ReturnType<typeof calcularCotizacion>

// Texto que se envía por WhatsApp a la empresa
export function construirMensaje(quote: Quote) {
  const detalle = quote.lines.map(
    ({ product, qty, unitPrice, amount }) =>
      `• REF-${product.ref} (${product.models[0]}) x ${qty} pzas · ${formatMXN(unitPrice)} c/u = ${formatMXN(amount)}`,
  )

  return [
    "Hola, quiero cotizar este pedido:",
    "",
    ...detalle,
    "",
    `Piezas: ${quote.totalPieces}${quote.isWholesale ? " (precio de mayoreo)" : ""}`,
    `Subtotal: ${formatMXN(quote.subtotal)}`,
    `IVA (${Math.round(business.ivaRate * 100)}%): ${formatMXN(quote.iva)}`,
    `Total: ${formatMXN(quote.total)}`,
    `Envío: ${quote.freeShipping ? "gratis" : "por cotizar"}`,
  ].join("\n")
}