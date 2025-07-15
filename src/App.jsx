
import './App.css'
import { useState, useEffect } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "./firebase"
import Login from "./components/login"
import BebidaForm from "./components/BebidaForm"
import BebidaLista from "./components/BebidaLista"

function App() {
  const [usuario, setUsuario] = useState(null)
  const [bebidas, setBebidas] = useState([])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user)
    })
    return () => unsubscribe()
  }, [])

  const añadirBebida = (tipo) => {
    const nueva = {
      tipo,
      timestamp: new Date().toISOString(),
      uid: usuario.uid
    }
    setBebidas([nueva, ...bebidas])
  }

  if (!usuario) return <Login onLogin={() => {}} />

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">🍻 Contador de Bebidas</h1>
        <button onClick={() => signOut(auth)} className="text-sm text-red-600 underline">
          Cerrar sesión
        </button>
      </div>

      <p className="text-sm text-gray-600">Bienvenido: {usuario.email}</p>
      <BebidaForm onAdd={añadirBebida} />
      <p className="mt-4">Bebidas totales: {bebidas.length}</p>
      <BebidaLista bebidas={bebidas} />
    </div>
  )
}

export default App

