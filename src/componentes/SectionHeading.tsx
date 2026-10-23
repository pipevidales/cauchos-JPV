type SectionHeadingProps = {
  eyebrow: string // texto pequeño rojo sobre el título
  title: string
  align?: "center" | "left"
  compact?: boolean // título un poco más pequeño, para columnas angostas
}

// Encabezado reutilizable para todas las secciones
function SectionHeading({ eyebrow, title, align = "center", compact = false }: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <p className="heading-display text-lg text-brand">{eyebrow}</p>
      <h2 className={`heading-display mt-2 leading-none ${compact ? "text-4xl md:text-5xl" : "text-4xl md:text-6xl"}`}>
        {title}
      </h2>
    </div>
  )
}

export default SectionHeading