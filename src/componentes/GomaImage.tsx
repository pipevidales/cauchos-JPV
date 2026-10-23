type GomaImageProps = {
  src: string
  alt: string
  className?: string // tamaño de la foto: "aspect-square w-full", "h-20 w-20", etc.
  orb?: string // cuánto sobresale el orbe de luz fuera de la foto: "-inset-6" = 1.5rem por cada lado
}

// Foto de una goma (recortada, sin fondo) con un orbe de luz detrás, para que se vea sobre el fondo oscuro
function GomaImage({ src, alt, className = "", orb = "-inset-4" }: GomaImageProps) {
  return (
    <div className={`relative ${className}`}>
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute ${orb} rounded-full bg-[radial-gradient(closest-side,rgba(165,165,180,.55),rgba(110,110,122,.3)_55%,transparent)]`}
      />
      <img src={src} alt={alt} draggable={false} className="relative h-full w-full object-contain p-1" />
    </div>
  )
}

export default GomaImage