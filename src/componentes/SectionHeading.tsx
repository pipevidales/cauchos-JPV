type SectionHeadingProps = {
  eyebrow: string // texto pequeño rojo sobre el título
  title: string
  align?: "center" | "left"
}

// Encabezado reutilizable para todas las secciones
function SectionHeading({ eyebrow, title, align = "center" }: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <p className="heading-display text-lg text-brand">{eyebrow}</p>
      <h2 className="heading-display mt-2 text-4xl leading-none md:text-6xl">{title}</h2>
    </div>
  )
}

export default SectionHeading