// Fondo decorativo con huellas de llanta que se desvanece hacia los bordes.
// Se coloca dentro de una sección con "relative isolate overflow-hidden".
function TreadBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 bg-tread [mask-image:radial-gradient(ellipse_at_50%_35%,black,transparent_72%)]"
    />
  )
}

export default TreadBackground