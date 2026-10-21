import { business } from "../data/business"

function Footer() {
  return (
    <footer className="border-t border-line px-6 py-10 text-center">
      <p className="heading-display text-2xl">Protege tu moto y protégete a ti.</p>
      <p className="mt-3 text-sm text-muted">
        © {new Date().getFullYear()} {business.name}. 100% hechos de llanta de tractor.
      </p>
    </footer>
  )
}

export default Footer