import Hero from "../secciones/Hero"
import Nosotros from "../secciones/Nosotros"
import Mayoreo from "../secciones/Mayoreo"
import Contacto from "../secciones/Contacto"

// Página de inicio: todas las secciones en un solo scroll
function Inicio() {
  return (
    <main>
      <Hero />
      <Nosotros />
      <Mayoreo />
      <Contacto />
    </main>
  )
}

export default Inicio