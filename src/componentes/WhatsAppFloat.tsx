import { whatsappLink } from "../data/business"
import WhatsAppIcon from "./WhatsAppIcon"

// Botón flotante de WhatsApp, visible en todas las páginas
function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink("Hola, quiero información sobre las gomas de impacto")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/40 transition duration-200 hover:scale-110 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      style={{ bottom: "calc(1.25rem + env(safe-area-inset-bottom, 0px))" }}
    >
      <span aria-hidden="true" className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40 motion-reduce:hidden" />
      <WhatsAppIcon className="h-8 w-8" />
    </a>
  )
}

export default WhatsAppFloat