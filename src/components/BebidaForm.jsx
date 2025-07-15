import { useState } from "react"

function BebidaForm({ onAdd }) {
  const [selectedDrink, setSelectedDrink] = useState("")

  const handleClick = () => {
    if (!selectedDrink) return
    onAdd(selectedDrink)
    setSelectedDrink("") // Reiniciar el desplegable tras añadir
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <select
        value={selectedDrink}
        onChange={(e) => setSelectedDrink(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2"
      >
        <option value="">Selecciona una bebida</option>
        <option value="cubata">Cubata</option>
        <option value="chupito">Chupito</option>
        <option value="cerveza">Cerveza</option>
      </select>

      <button
        onClick={handleClick}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={!selectedDrink}
      >
        Añadir bebida
      </button>
    </div>
  )
}

export default BebidaForm
