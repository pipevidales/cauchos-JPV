import Hero from "../secciones/Hero"
import Nosotros from "../secciones/Nosotros"
import ComoComprar from "../secciones/ComoComprar"
import Mayoreo from "../secciones/Mayoreo"
import Contacto from "../secciones/Contacto"

// Página de inicio: todas las secciones en un solo scroll
function Inicio() {
  return (
    <main>
      <Hero />
      <Nosotros />
      <ComoComprar />
      <Mayoreo />
      <Contacto />
    </main>
  )
}

export default Inicio