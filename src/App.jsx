import './App.css'
import { useState, useEffect } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "./firebase"
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  addDoc
} from "firebase/firestore"
import { db } from "./firebase"

import Login from "./components/login"
import BebidaForm from "./components/BebidaForm"
import BebidaLista from "./components/BebidaLista"
import EstadisticasGlobales from "./components/StatsGloables"
import EstadisticasUsuario from "./components/StatsUsuarios" // nuevo
import EditarBebidas from "./components/EditarBebidas" // nuevo
import Ranking from "./components/Ranking" // nuevo

function App() {
  const [usuario, setUsuario] = useState(null)
  const [bebidas, setBebidas] = useState([])
  const [vista, setVista] = useState("inicio") // 'inicio' o 'global'

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setUsuario(user)
    })
    return () => unsubscribeAuth()
  }, [])

  useEffect(() => {
    const q = query(collection(db, "bebidas"), orderBy("timestamp", "desc"))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const datos = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setBebidas(datos)
    })
    return () => unsubscribe()
  }, [])


  const añadirBebida = async (tipo) => {
    const nueva = {
      tipo,
      timestamp: new Date().toISOString(),
      uid: usuario.uid,
      email: usuario.email
    }
    await addDoc(collection(db, "bebidas"), nueva)
  }

  if (!usuario) return <Login onLogin={() => {}} />

  const bebidasUsuario = bebidas.filter(b => b.uid === usuario.uid)

  return (
    <div className="max-w-md w-full mx-auto mt-6 p-4 border rounded shadow
                md:max-w-md md:p-4">
    {/* NAVBAR */}
    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-2">
      <h1 className="text-xl font-bold text-center md:text-left">
        🍻 Contador de Bebidas
      </h1>
      <button
        onClick={() => signOut(auth)}
        className="text-sm text-red-600 underline md:self-center"
      >
        Cerrar sesión
      </button>
    </div>

    <div className="flex flex-wrap justify-center gap-2 mb-4">
      <button
        onClick={() => setVista("inicio")}
        className={`px-3 py-1 rounded min-w-[80px] text-center ${
          vista === "inicio" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        Inicio
      </button>
      <button
        onClick={() => setVista("global")}
        className={`px-3 py-1 rounded min-w-[80px] text-center ${
          vista === "global" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        Global
      </button>
      <button
        onClick={() => setVista("editar")}
        className={`px-3 py-1 rounded min-w-[80px] text-center ${
          vista === "editar" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        Editar
      </button>
      <button
        onClick={() => setVista("ranking")}
        className={`px-3 py-1 rounded min-w-[80px] text-center ${
          vista === "ranking" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        Ranking
      </button>
    </div>


      {vista === "inicio" && (
        <>
          <p className="text-sm text-gray-600 mb-2">Bienvenido: {usuario.displayName || usuario.email}</p>
          <BebidaForm onAdd={añadirBebida} />
          <p className="mt-4">Bebidas totales: {bebidasUsuario.length}</p>
          <BebidaLista bebidas={bebidasUsuario} />
          <EstadisticasUsuario bebidas={bebidasUsuario} />
        </>
      )}

      {vista === "global" && (
        <EstadisticasGlobales bebidas={bebidas} />
      )}

      {vista === "editar" && (
        <EditarBebidas bebidas={bebidas} uid={usuario.uid} />
      )}
      {vista === "ranking" && (
        <Ranking />
      )}
    </div>
  )
}

export default App
