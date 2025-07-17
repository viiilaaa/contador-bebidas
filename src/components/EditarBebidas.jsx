import { useState } from "react"
import { collection, addDoc, query, where, orderBy, limit, getDocs, deleteDoc, doc } from "firebase/firestore"
import { db } from "../firebase"

function EditarBebidas({ bebidas, uid, email }) {

  // Filtramos las bebidas solo del usuario
  const ahora = new Date()
  const hace24h = new Date(ahora.getTime() - 24 * 60 * 60 * 1000)

  const bebidasUsuario = bebidas.filter(b => {
    const fecha = new Date(b.timestamp) // Asegúrate de que `b.timestamp` sea un string ISO o conviértelo si es un objeto Timestamp
    return b.uid === uid && fecha > hace24h
  })


  // Contamos cuántas de cada tipo
  const resumenTipos = bebidasUsuario.reduce((acc, b) => {
    acc[b.tipo] = acc[b.tipo] ? [...acc[b.tipo], b] : [b]
    return acc
  }, {})

  // Tipos permitidos, para no tener que sacar del resumen solo
  const tipos = ["cerveza", "cubata", "chupito"]

  // Añadir bebida nueva con timestamp actual
  const añadirBebida = async (tipo) => {
    try {
      await addDoc(collection(db, "bebidas"), {
        uid,
        tipo,
        email,
        timestamp: new Date().toISOString(),
      })
    } catch (error) {
      console.error("Error añadiendo bebida:", error)
    }
  }

  // Eliminar la última bebida añadida de ese tipo
  const eliminarUltimaBebida = async (tipo) => {
    try {
      // Buscamos la bebida más reciente de ese tipo del usuario
      const q = query(
        collection(db, "bebidas"),
        where("uid", "==", uid),
        where("tipo", "==", tipo),
        orderBy("timestamp", "desc"),
        limit(1)
      )
      const querySnapshot = await getDocs(q)
      if (!querySnapshot.empty) {
        const bebidaDoc = querySnapshot.docs[0]
        await deleteDoc(doc(db, "bebidas", bebidaDoc.id))
      }
    } catch (error) {
      console.error("Error eliminando bebida:", error)
    }
  }

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-2">✏️ Editar Mis Bebidas (Últimas 24h)</h2>
      {tipos.map((tipo) => {
        const cantidad = resumenTipos[tipo]?.length || 0
        return (
          <div key={tipo} className="flex items-center justify-between border rounded p-2 my-1">
            <span className="font-semibold">{tipo}s</span>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => eliminarUltimaBebida(tipo)}
                className="bg-red-500 text-white px-3 py-1 rounded disabled:opacity-50"
                disabled={cantidad === 0}
                aria-label={`Eliminar una bebida de tipo ${tipo}`}
              >
                -
              </button>
              <span className="w-6 text-center">{cantidad}</span>
              <button
                onClick={() => añadirBebida(tipo)}
                className="bg-green-500 text-white px-3 py-1 rounded"
                aria-label={`Añadir una bebida de tipo ${tipo}`}
              >
                +
              </button>
            </div>
          </div>
        )
      })}
      {bebidasUsuario.length === 0 && (
        <p className="text-sm text-gray-600 mt-4">No tienes bebidas registradas.</p>
      )}
    </div>
  )
}

export default EditarBebidas
