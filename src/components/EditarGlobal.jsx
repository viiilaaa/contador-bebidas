import { useState } from "react"
import EditarBebidas from "./EditarBebidas"
import RelUsuName from "./RelUsuName"

function EditarGlobal({ bebidas }) {
  // Obtener todos los uids únicos (sin filtro de últimas 24h)
  const uidsUnicos = Array.from(new Set(bebidas.map(b => b.uid)))

  const [uidSeleccionado, setUidSeleccionado] = useState("")

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-4">🛠 Editar Bebidas Globales (Últimas 24h)</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Seleccionar usuario:</label>
        <select
          className="border p-2 rounded w-full"
          onChange={e => setUidSeleccionado(e.target.value)}
          value={uidSeleccionado}
        >
          <option value="" disabled>-- Selecciona un usuario --</option>
          {uidsUnicos.map(uid => {
            const email = bebidas.find(b => b.uid === uid)?.email || "Anónimo"
            return (
              <option key={uid} value={uid}>
                {email}
              </option>
            )
          })}
        </select>
      </div>

      {uidSeleccionado && (
        <div className="mt-4 border-t pt-4">
          <EditarBebidas bebidas={bebidas} uid={uidSeleccionado} />
        </div>
      )}
    </div>
  )
}


export default EditarGlobal
