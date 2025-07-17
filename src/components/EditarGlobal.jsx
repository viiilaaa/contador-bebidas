import EditarBebidas from "./EditarBebidas"
import RelUsuName from "./RelUsuName"

import { useState, useEffect } from "react"
import { getFirestore, collection, getDocs } from "firebase/firestore"


function EditarGlobal({ bebidas }) {
  const [usuarios, setUsuarios] = useState([]) // lista de { uid, email }
  const [uidSeleccionado, setUidSeleccionado] = useState("")

  useEffect(() => {
    async function fetchUsuarios() {
      const db = getFirestore()
      const querySnapshot = await getDocs(collection(db, "usuarios"))
      const lista = []
      querySnapshot.forEach(doc => {
        const data = doc.data()
        lista.push({ uid: doc.id, email: data.email, Nombre: data.Nombre || "Anónimo" })
      })
      setUsuarios(lista)
    }
    fetchUsuarios()
  }, [])

  return (
    <div className="mt-6">
      <h2 className="text-center text-lg font-bold mb-4">🛠 Editar Bebidas (Últimas 24h)</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Seleccionar usuario:</label>
        <select
          className="border p-2 rounded w-full"
          onChange={e => setUidSeleccionado(e.target.value)}
          value={uidSeleccionado}
        >
          <option value="" disabled>-- Selecciona un usuario --</option>
          {usuarios.map(({ uid, Nombre, email }) => (
            <option key={uid} value={uid}>{`${Nombre}`}</option>
          ))}
        </select>
      </div>

      {uidSeleccionado && (
        <div className="mt-4 border-t pt-4">
          <EditarBebidas
            bebidas={bebidas}
            uid={uidSeleccionado}
            email={usuarios.find(u => u.uid === uidSeleccionado)?.email || "Anónimo"}
            />
        </div>
      )}
    </div>
  )
}


export default EditarGlobal
