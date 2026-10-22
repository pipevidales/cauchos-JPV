import Reveal from "../componentes/Reveal"
import SectionHeading from "../componentes/SectionHeading"
import { business } from "../data/business"

function Preguntas() {
  const ivaPct = Math.round(business.ivaRate * 100)

  // Las respuestas usan los datos de business.ts: si cambia una regla, el texto se actualiza solo
  const faqs = [
    {
      q: "¿Cuál es el pedido mínimo?",
      a: `El pedido mínimo es de ${business.minOrder} piezas en total. Puedes combinar cualquier referencia.`,
    },
    {
      q: "¿Desde cuántas piezas hay precio de mayoreo?",
      a: `Desde ${business.wholesaleFrom} piezas (de cualquier referencia) cada pieza baja $${business.wholesaleDiscount}.`,
    },
    {
      q: "¿Los precios incluyen IVA?",
      a: business.pricesIncludeIva
        ? `Sí, los precios ya incluyen el IVA del ${ivaPct}%.`
        : `No. A los precios se les suma el IVA del ${ivaPct}%; el cotizador te muestra el total ya calculado.`,
    },
    {
      q: "¿Hacen envíos?",
      a: `Sí, a toda la República Mexicana. El costo del envío se cotiza por WhatsApp y es gratis desde ${business.freeShippingFrom} piezas.`,
    },
    {
      q: "¿Cómo sé cuál goma le queda a mi moto?",
      a: "Busca el modelo en el catálogo. Si no lo encuentras, escríbenos por WhatsApp y lo consultamos.",
    },
    {
      q: "¿De qué material están hechas?",
      a: "Cada goma de impacto es 100% hecha de llanta de tractor, un material altamente resistente al que le damos una nueva vida.",
    },
  ]

  return (
    <section id="preguntas" className="mx-auto max-w-3xl px-6 py-24">
      <Reveal>
        <SectionHeading eyebrow="Preguntas frecuentes" title="Resolvemos tus dudas" />
      </Reveal>

      <div className="mt-10 space-y-3">
        {faqs.map(({ q, a }, i) => (
          <Reveal key={q} delay={i * 80}>
            {/* <details> abre y cierra solo, sin JavaScript */}
            <details className="group rounded-xl border border-line bg-surface transition-colors duration-200 open:border-brand/60">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold [&::-webkit-details-marker]:hidden">
                {q}
                <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-brand transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <p className="px-5 pb-5 text-muted">{a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default Preguntas