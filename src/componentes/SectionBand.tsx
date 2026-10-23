import type { ReactNode } from "react"
import Reveal from "./Reveal"

// Barra roja que cruza todo el ancho de la pantalla con el nombre de la sección en blanco.
// Al aparecer, la barra se "dibuja" de izquierda a derecha y luego entra el texto.
function SectionBand({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      <Reveal from="wipe" className="absolute inset-0 bg-brand/90 shadow-lg shadow-red-950/50" />

      <div className="relative mx-auto max-w-6xl px-6 py-3">
        <Reveal delay={300}>
          <h2 className="heading-display text-3xl text-white md:text-4xl">{children}</h2>
        </Reveal>
      </div>
    </div>
  )
}

export default SectionBand