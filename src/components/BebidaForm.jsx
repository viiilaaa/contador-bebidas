function BebidaForm({ onAdd }) {
  const handleClick = () => {
    const tipo = prompt("¿Qué bebida has tomado?") || "Desconocida"
    onAdd(tipo)
  }

  return (
    <div className="flex justify-center">
      <button
        onClick={handleClick}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Añadir bebida
      </button>
    </div>
  )
}

export default BebidaForm
