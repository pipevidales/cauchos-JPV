type Variant = "lugs" | "zigzag" | "grain" | "glow"

// Capa de textura de cada variante
const textures: Record<Variant, string> = {
  lugs: "bg-lugs [mask-image:radial-gradient(ellipse_at_50%_40%,black,transparent_78%)]", // tacos de llanta
  zigzag: "bg-tread [mask-image:radial-gradient(ellipse_at_50%_35%,black,transparent_72%)]", // el zigzag anterior
  grain: "bg-grain", // grano fino
  glow: "", // sin textura, solo el brillo rojo
}

// Fondo decorativo de sección: textura + brillo rojo suave en las esquinas.
// Cambia la apariencia con la prop "variant", por ejemplo <TreadBackground variant="grain" />.
// Se coloca dentro de una sección con "relative isolate overflow-hidden".
function TreadBackground({ variant = "lugs" }: { variant?: Variant }) {
  return (
    <>
      <div aria-hidden="true" className={`pointer-events-none absolute inset-0 -z-10 ${textures[variant]}`} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_90%_0%,rgba(190, 26, 40, 0.16),transparent_10%),radial-gradient(ellipse_at_0%_100%,rgba(225,29,46,.10),transparent_10%)]"
      />
    </>
  )
}

export default TreadBackground