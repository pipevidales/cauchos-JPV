import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react"

type RevealProps = {
  children: ReactNode
  as?: ElementType // etiqueta HTML a usar: "div" por defecto, "li" dentro de listas, etc.
  from?: "up" | "left" | "right" | "none" // desde dónde aparece
  delay?: number // retraso en milisegundos (sirve para que los elementos entren uno tras otro)
  className?: string
}

const hiddenState = {
  up: "translate-y-8",
  left: "-translate-x-10",
  right: "translate-x-10",
  none: "",
}

// Hace que su contenido aparezca (fundido + desplazamiento) la primera vez que entra en pantalla
function Reveal({ children, as: Tag = "div", from = "up", delay = 0, className = "" }: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  // Si la persona prefiere menos movimiento, se muestra todo de una vez
  const [visible, setVisible] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  )

  useEffect(() => {
    const el = ref.current
    if (!el || visible) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect() // solo anima una vez
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [visible])

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-[opacity,translate] duration-700 ease-out motion-reduce:transition-none ${
        visible ? "translate-x-0 translate-y-0 opacity-100" : `opacity-0 ${hiddenState[from]}`
      } ${className}`}
    >
      {children}
    </Tag>
  )
}

export default Reveal