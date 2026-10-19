import { useEffect } from "react"
import { useLocation } from "react-router"

// Controla el scroll cada vez que se navega:
// - si la dirección trae un ancla (/#nosotros), baja hasta esa sección
// - si no, sube al inicio de la página
function ScrollManager() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 })
      return
    }

    const id = hash.slice(1)
    const goToSection = () =>
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

    // Pequeña espera: si venimos de otra página, la sección aún se está pintando
    const timer = setTimeout(goToSection, 80)
    return () => clearTimeout(timer)
  }, [pathname, hash, key])

  return null
}

export default ScrollManager