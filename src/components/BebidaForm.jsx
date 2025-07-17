import { useState, useEffect, useRef } from "react"
import { FaStar, FaRegStar } from "react-icons/fa"
import { doc, updateDoc, getDoc } from "firebase/firestore"
import { db } from "../firebase"

const bebidas = [
  { id: "chupito", nombre: "Chupito" },
  { id: "cerveza", nombre: "Cerveza" },
  { id: "ron-cola", nombre: "Ron-cola" },
  { id: "ron-naranja", nombre: "Ron-naranja" },
  { id: "calimocho", nombre: "Calimocho" },
  { id: "bacardi-limon", nombre: "Bacardí Limón" },
]

function BebidaForm({ onAdd, uid }) {
  const [selectedDrink, setSelectedDrink] = useState(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [favDrink, setFavDrink] = useState(null)

  const dropdownRef = useRef(null) // <-- ref al contenedor del dropdown

  // Cerrar dropdown si click fuera de él
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }

    // Limpieza para evitar múltiples listeners
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [dropdownOpen])

  // Funciones para guardar y cargar favorita en Firestore
  const guardarBebidaFavorita = async (bebida) => {
    if (!uid) return
    const ref = doc(db, "usuarios", uid)

    if (favDrink === bebida) {
      // Si la bebida ya es favorita, la desmarcamos
      await updateDoc(ref, { bebidaFav: null })
      setFavDrink(null)
    } else {
      // Si no, la marcamos como favorita
      await updateDoc(ref, { bebidaFav: bebida })
      setFavDrink(bebida)
    }
  }


  const cargarBebidaFavorita = async () => {
    if (!uid) return
    const ref = doc(db, "usuarios", uid)
    const snap = await getDoc(ref)
    if (snap.exists()) {
      setFavDrink(snap.data().bebidaFav || null)
    }
  }

  useEffect(() => {
    cargarBebidaFavorita()
  }, [uid])

  const handleAdd = () => {
    if (!selectedDrink) return
    onAdd(selectedDrink)
    setSelectedDrink(null)
  }

  return (
    <div className="flex flex-col items-center gap-4 relative" ref={dropdownRef}>
      {/* Botón para abrir dropdown */}
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="border border-gray-300 rounded px-4 py-2 w-64 bg-white text-left"
      >
        {selectedDrink ? bebidas.find(b => b.id === selectedDrink)?.nombre : "Selecciona una bebida"}
      </button>

      {/* Opciones desplegables */}
      {dropdownOpen && (
        <div className="absolute top-12 w-64 border border-gray-300 rounded bg-white z-10 shadow">
          {bebidas.map((bebida) => (
            <div
              key={bebida.id}
              className="flex justify-between items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setSelectedDrink(bebida.id)
                setDropdownOpen(false)
              }}
            >
              <span>{bebida.nombre}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  guardarBebidaFavorita(bebida.id)
                }}
                className="text-yellow-500"
              >
                {favDrink === bebida.id ? <FaStar /> : <FaRegStar />}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Botón añadir */}
      <button
        onClick={handleAdd}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={!selectedDrink}
      >
        Añadir bebida
      </button>

      {/* Acceso rápido a favorita */}
      {favDrink && (
        <button
          onClick={() => onAdd(favDrink)}
          className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-semibold px-4 py-2 rounded disabled:opacity-50 transition-colors duration-200"
          disabled={!favDrink}
        >
          Añadir favorita ({bebidas.find(b => b.id === favDrink)?.nombre})
        </button>

      )}
    </div>
  )
}

export default BebidaForm
