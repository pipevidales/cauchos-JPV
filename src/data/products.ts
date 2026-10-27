import ref01 from "../imagenes/productos/ref-01.webp"
import ref02 from "../imagenes/productos/ref-02.webp"
import ref03 from "../imagenes/productos/ref-03.webp"
import ref04 from "../imagenes/productos/ref-04.webp"
import ref05 from "../imagenes/productos/ref-05.webp"
import ref06 from "../imagenes/productos/ref-06.webp"
import ref07 from "../imagenes/productos/ref-07.webp"
import ref08 from "../imagenes/productos/ref-08.webp"
import ref09 from "../imagenes/productos/ref-09.webp"
import ref10 from "../imagenes/productos/ref-10.webp"

// Forma que debe tener cada producto del catálogo
export type Product = {
  ref: string // número de referencia, por ejemplo "01"
  models: string[] // motos compatibles
  price: number // precio en pesos mexicanos (MXN)
  wholesale: boolean // true = tiene precio de mayoreo; false = precio fijo
  image: string // ruta de la foto (la genera Vite al importarla)
}

export const products: Product[] = [
  { ref: "01", models: ["CT 100"], price: 30, wholesale: true, image: ref01 },
  { ref: "02", models: ["AT 110"], price: 30, wholesale: true, image: ref02 },
  {
    ref: "03",
    models: ["FT 125 - 150 TS", "TC 250 - TC 200", "Yamaha YBR 125", "CGL Cargo Tool"],
    price: 30,
    wholesale: true,
    image: ref03,
  },
  { ref: "04", models: ["Pulsar NS 200"], price: 30, wholesale: true, image: ref04 },
  {
    ref: "05",
    models: ["Vento", "GS 125 - GN 125 - EN125", "Crossmax 200"],
    price: 40,
    wholesale: true,
    image: ref05,
  },
  {
    ref: "06",
    models: [
      "Pulsar NS 160 - 125 - 150",
      "Pulsar 180 - 135 LS",
      "Discover 125 5G/ST/M",
      "Discover 160",
      "Boxer 150",
    ],
    price: 40,
    wholesale: true,
    image: ref06,
  },
  {
    ref: "07",
    models: ["Honda Cargo GL 150", "CBF 125", "Invicta 160", "CB 160 Invicta", "CB 190 R"],
    price: 40,
    wholesale: true,
    image: ref07,
  },
  { ref: "08", models: ["Gixxer 125-150-155"], price: 30, wholesale: true, image: ref08 },
  { ref: "09", models: ["Italika RC 150 / RC 200", "Suzuki AX4"], price: 30, wholesale: true, image: ref09 },
  {
    ref: "10",
    models: ["Italika 250 SZ - 250Z - RT 250", "Vort-X 300"],
    price: 40,
    wholesale: true,
    image: ref10,
  },
]