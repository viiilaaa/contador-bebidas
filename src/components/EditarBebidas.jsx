// src/components/EditarBebidas.jsx
import { useState } from "react"
import { doc, updateDoc, deleteDoc } from "firebase/firestore"
import { db } from "../firebase"

function EditarBebidas({ bebidas, uid }) {
  const [editandoId, setEditandoId] = useState(null)
  const [nuevoTipo, setNuevoTipo] = useState("")

  const empezarEdicion = (bebida) => {
    setEditandoId(bebida.id)
    setNuevoTipo(bebida.tipo)
  }

  const guardarCambios = async (id) => {
    const ref = doc(db, "bebidas", id)
    await updateDoc(ref, { tipo: nuevoTipo })
    setEditandoId(null)
  }

  const eliminarBebida = async (id) => {
    const ref = doc(db, "bebidas", id)
    await deleteDoc(ref)
  }

  const bebidasUsuario = bebidas.filter(b => b.uid === uid)

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-2">✏️ Editar Mis Bebidas</h2>
      {bebidasUsuario.length === 0 ? (
        <p className="text-sm text-gray-600">No tienes bebidas registradas.</p>
      ) : (
        <ul className="space-y-2">
          {bebidasUsuario.map((b) => (
            <li key={b.id} className="border p-2 rounded">
              {editandoId === b.id ? (
                <div className="flex items-center space-x-2">
                  <select
                    value={nuevoTipo}
                    onChange={(e) => setNuevoTipo(e.target.value)}
                    className="border px-2 py-1 rounded"
                  >
                    <option value="Cerveza">Cerveza</option>
                    <option value="Cubata">Cubata</option>
                    <option value="Chupito">Chupito</option>
                  </select>
                  <button
                    onClick={() => guardarCambios(b.id)}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setEditandoId(null)}
                    className="text-sm text-gray-600"
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <span>
                    {b.tipo} — {new Date(b.timestamp).toLocaleTimeString()}
                  </span>
                  <div className="space-x-2">
                    <button
                      onClick={() => empezarEdicion(b)}
                      className="text-blue-600 underline text-sm"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => eliminarBebida(b.id)}
                      className="text-red-600 underline text-sm"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default EditarBebidas
