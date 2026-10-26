// Datos del negocio en un solo lugar: si cambia un número o una regla, se edita aquí.

// Descuento en PORCENTAJE según el TOTAL de piezas del pedido (suma de todas las referencias).
// Solo se aplica en las referencias que tienen mayoreo (ver "wholesale" en products.ts).
const wholesaleTiers = [
  { from: 100, percent: 5 }, // de 100 a 499 piezas: 5% menos por pieza
  { from: 500, percent: 10 }, // desde 500 piezas: 10% menos por pieza
]

export const business = {
  name: "Cauchos JPV",
  whatsapp: "528715136684", // formato internacional, sin "+" ni espacios
  whatsappDisplay: "+52 871-513-6684",

  // Reglas de venta (las usan el cotizador y la sección Mayoreo)
  minOrder: 20, // pedido mínimo, en piezas (de cualquier referencia)
  wholesaleTiers,
  wholesaleFrom: wholesaleTiers[0].from, // desde aquí empieza el mayoreo
  freeShippingFrom: 500, // desde aquí el envío es gratis
  ivaRate: 0.16, // IVA del 16%
  pricesIncludeIva: false, // false = los precios del catálogo NO incluyen IVA (se suma)

  socials: [
    { name: "Instagram", handle: "@cauchosjpv", url: "https://instagram.com/cauchosjpv" },
    { name: "Facebook", handle: "@cauchosjpv", url: "https://facebook.com/cauchosjpv" },
    { name: "TikTok", handle: "@cauchos.jpv", url: "https://www.tiktok.com/@cauchos.jpv" },
  ],
}

// Crea el enlace de WhatsApp con un mensaje ya escrito (opcional)
export function whatsappLink(message?: string) {
  const base = `https://wa.me/${business.whatsapp}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}