import SectionHeading from "../componentes/SectionHeading"

const valores = ["Reciclamos", "Transformamos", "Creamos"]

function Nosotros() {
  return (
    <section id="nosotros" className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid items-center gap-12 md:grid-cols-2">

        <div>
          <SectionHeading align="left" eyebrow="Nosotros" title="Resistencia que se transforma en calidad" />

          <ul className="mt-6 flex flex-wrap gap-2">
            {valores.map((valor, i) => (
              <li
                key={valor}
                className={`rounded-full border px-4 py-1.5 text-sm font-semibold uppercase tracking-wide ${
                  i === valores.length - 1 ? "border-brand text-brand" : "border-line"
                }`}
              >
                {valor}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4 text-lg leading-relaxed text-muted">
          <p>
            En Cauchos JPV convertimos la fuerza de la llanta de tractor en productos diseñados para
            resistir, durar y cumplir.
          </p>
          <p>
            Cada una de nuestras gomas de impacto es 100% hecha de llanta de tractor, aprovechando las
            propiedades de un material altamente resistente para darle una nueva vida y transformarlo en
            un producto funcional y confiable.
          </p>
          <p>
            Nuestra filosofía es sencilla: ofrecer calidad, resistencia y durabilidad, manteniendo precios
            accesibles para nuestros clientes.
          </p>
        </div>

      </div>
    </section>
  )
}

export default Nosotros