import { business } from "../data/business"
import { products, type Product } from "../data/products"

// Cantidades que escribe el cliente: { "01": 50, "03": 60 }
export type Quantities = Record<string, number>

const round2 = (n: number) => Math.round(n * 100) / 100

export function formatMXN(value: number) {
  return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(value)
}

// Porcentaje de descuento según el total de piezas del pedido (suma de todas las referencias)
export function descuentoPorcentaje(totalPieces: number) {
  let percent = 0
  for (const tier of business.wholesaleTiers) {
    if (totalPieces >= tier.from) percent = tier.percent
  }
  return percent
}

// Precio de una pieza con un porcentaje de descuento. Ej.: $30 con 5% → $28.50
export function precioConDescuento(price: number, percent: number) {
  return round2(price * (1 - percent / 100))
}

// Precio por pieza de una referencia: el descuento solo aplica en las que tienen mayoreo
export function precioUnitario(product: Product, percent: number) {
  return product.wholesale ? precioConDescuento(product.price, percent) : product.price
}

// Toda la lógica de precios vive aquí, separada de la pantalla
export function calcularCotizacion(quantities: Quantities) {
  const totalPieces = products.reduce((sum, p) => sum + (quantities[p.ref] || 0), 0)
  const discountPercent = descuentoPorcentaje(totalPieces)

  const lines = products
    .filter((p) => (quantities[p.ref] || 0) > 0)
    .map((product) => {
      const qty = quantities[product.ref]
      const unitPrice = precioUnitario(product, discountPercent)
      return { product, qty, unitPrice, amount: round2(unitPrice * qty) }
    })

  const base = round2(lines.reduce((sum, l) => sum + l.amount, 0))
  const rate = business.ivaRate
  const subtotal = business.pricesIncludeIva ? round2(base / (1 + rate)) : base
  const total = business.pricesIncludeIva ? base : round2(base * (1 + rate))
  const iva = round2(total - subtotal)

  return {
    lines,
    totalPieces,
    discountPercent,
    wholesaleApplied: discountPercent > 0 && lines.some((l) => l.product.wholesale),
    subtotal,
    iva,
    total,
    freeShipping: totalPieces >= business.freeShippingFrom,
    canSend: totalPieces >= business.minOrder,
    missingForMin: Math.max(0, business.minOrder - totalPieces),
  }
}

export type Quote = ReturnType<typeof calcularCotizacion>

// Texto que se envía por WhatsApp a la empresa
export function construirMensaje(quote: Quote, codigoPostal = "") {
  const detalle = quote.lines.map(
    ({ product, qty, unitPrice, amount }) =>
      `• REF-${product.ref} (${product.models[0]}) x ${qty} pzas · ${formatMXN(unitPrice)} c/u = ${formatMXN(amount)}`,
  )

  return [
    "Hola, quiero cotizar este pedido:",
    "",
    ...detalle,
    "",
    `Piezas: ${quote.totalPieces}${quote.wholesaleApplied ? ` (descuento de mayoreo: ${quote.discountPercent}%)` : ""}`,
    `Subtotal: ${formatMXN(quote.subtotal)}`,
    `IVA (${Math.round(business.ivaRate * 100)}%): ${formatMXN(quote.iva)}`,
    `Total: ${formatMXN(quote.total)}`,
    `Envío: ${quote.freeShipping ? "gratis" : "por cotizar"}`,
    `Código postal de envío: ${codigoPostal}`,
  ].join("\n")
}

// Próxima meta del pedido (mínimo → cada escalón de mayoreo → envío gratis), para la barra de progreso
export function siguienteMeta(totalPieces: number) {
  const { minOrder, wholesaleTiers, freeShippingFrom } = business

  if (totalPieces < minOrder) {
    return { goal: minOrder, text: `Pedido mínimo: ${totalPieces} de ${minOrder} piezas` }
  }

  const metas = [...new Set([...wholesaleTiers.map((t) => t.from), freeShippingFrom])].sort((a, b) => a - b)
  const goal = metas.find((m) => m > totalPieces)
  if (goal === undefined) {
    return { goal: freeShippingFrom, text: "¡Tienes el mejor precio de mayoreo y envío gratis!" }
  }

  // Qué se desbloquea al llegar a esa meta
  const beneficios: string[] = []
  const tierIndex = wholesaleTiers.findIndex((t) => t.from === goal)
  if (tierIndex >= 0) {
    const descuento = `${wholesaleTiers[tierIndex].percent}% de descuento`
    beneficios.push(tierIndex === 0 ? `precio de mayoreo (${descuento})` : descuento)
  }
  if (goal === freeShippingFrom) beneficios.push("envío gratis")

  return { goal, text: `Faltan ${goal - totalPieces} piezas para ${beneficios.join(" y ")}` }
}