import { Link } from "react-router"
import Reveal from "../componentes/Reveal"
import Stripes from "../componentes/Stripes"
import { business } from "../data/business"

function Mayoreo() {
  const { minOrder, wholesaleTiers, freeShippingFrom, wholesaleFrom } = business

  // Los datos salen de business.ts: si cambian las reglas, se actualizan aquí solas
  const reglas = [
    `Pedido mínimo: ${minOrder} piezas`,
    ...wholesaleTiers.map((tier, i) => {
      const siguiente = wholesaleTiers[i + 1]
      const rango = siguiente ? `De ${tier.from} a ${siguiente.from - 1} piezas` : `Desde ${tier.from} piezas`
      return `${rango}: ${tier.percent}% de descuento`
    }),
    `Envío gratis desde ${freeShippingFrom} piezas`,
  ]

  return (
    <section id="mayoreo" className="relative isolate overflow-hidden px-6 py-14">
      <Stripes className="-left-20 bottom-0" />

      <Reveal className="mx-auto max-w-5xl">
        <div
          className="rounded-2xl border border-brand/40 p-8 text-center md:p-14"
          style={{ background: "linear-gradient(135deg, rgba(225,29,46,.2), rgba(20,20,22,.9))" }}
        >
          <h2 className="heading-display text-4xl leading-none md:text-6xl">Envíos a toda la República Mexicana</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
            Precios de mayoreo en referencias seleccionadas, a partir de{" "}
            <b className="text-white">{wholesaleFrom} piezas</b>.
          </p>

          <ul className="mt-6 flex flex-wrap justify-center gap-2">
            {reglas.map((regla) => (
              <li key={regla} className="rounded-full border border-line bg-bg/60 px-4 py-1.5 text-sm font-semibold">
                {regla}
              </li>
            ))}
          </ul>

          <Link
            to="/cotizar"
            className="mt-8 inline-block rounded-lg bg-white px-7 py-3.5 font-semibold text-black transition duration-200 hover:scale-105 active:scale-95"
          >
            Cotizar mi pedido
          </Link>
        </div>
      </Reveal>
    </section>
  )
}

export default Mayoreo