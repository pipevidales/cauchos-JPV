import { Navigate, Route, Routes } from "react-router"
import Navbar from "./componentes/Navbar"
import Footer from "./componentes/Footer"
import ScrollManager from "./componentes/ScrollManager"
import Inicio from "./paginas/Inicio"
import Productos from "./paginas/Productos"
//import Cotizar from "./paginas/Cotizar"

function App() {
  return (
    <>
      <ScrollManager />
      <Navbar />

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<Productos />} />

       {/* <Route path="/cotizar" element={<Cotizar />} />  */}
        
        {/* Cualquier otra dirección vuelve al inicio */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App