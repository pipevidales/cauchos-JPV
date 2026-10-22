// Franjas inclinadas rojas, como las esquinas del catálogo del cliente (solo decoración)
function Stripes({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute -z-10 flex -skew-x-[28deg] gap-3 ${className}`}
    >
      <span className="h-44 w-5 bg-brand" />
      <span className="h-44 w-10 bg-brand/35" />
      <span className="h-44 w-2 bg-white/20" />
    </div>
  )
}

export default Stripes