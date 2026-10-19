import { Navigate, Route, Routes } from "react-router"
import Navbar from "./componentes/Navbar"
import ScrollManager from "./componentes/ScrollManager"
import Inicio from "./paginas/Inicio"
import Productos from "./paginas/Productos"

function App() {
  return (
    <>
      <ScrollManager />
      <Navbar />

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<Productos />} />
        {/* Cualquier otra dirección vuelve al inicio */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App