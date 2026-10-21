// Datos del negocio en un solo lugar: si cambia un número o una regla, se edita aquí.
export const business = {
  name: "Cauchos JPV",
  whatsapp: "528715136684", // formato internacional, sin "+" ni espacios
  whatsappDisplay: "+52 871-513-6684",

  // Reglas de venta (las usa el cotizador y la sección Mayoreo)
  minOrder: 20, // pedido mínimo, en piezas (de cualquier referencia)
  wholesaleFrom: 100, // desde aquí aplica precio de mayoreo
  wholesaleDiscount: 10, // pesos menos por pieza en mayoreo
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