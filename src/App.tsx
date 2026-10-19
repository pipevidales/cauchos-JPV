import { products } from "./data/products"

function App() {
  return (
    <main className="mx-auto grid max-w-6xl gap-4 p-6 sm:grid-cols-3 lg:grid-cols-5">
      {products.map((p) => (
        <div key={p.ref} className="rounded-xl border border-line bg-surface p-3">
          <img src={p.image} alt={`REF-${p.ref}`} className="aspect-square w-full rounded-lg object-cover" />
          <p className="heading-display mt-2 text-brand">REF - {p.ref}</p>
          <p className="text-sm text-muted">{p.models.join(", ")}</p>
          <p className="mt-1 font-semibold">${p.price} MXN</p>
        </div>
      ))}
    </main>
  )
}

export default App