// src/components/Ranking.jsx
import PodioTop3 from "./PodioTop3"

function Ranking({ usuarios, bebidas }) {


  const ahora = new Date()
  const hace24h = new Date(ahora.getTime() - 24 * 60 * 60 * 1000)

  const resumenUsuarios = usuarios.map((usuario) => {
    const bebidasUsuario = bebidas.filter(
      (b) => b.uid === usuario.id && new Date(b.timestamp) > hace24h
    )
    return {
      uid: usuario.id,
      email: usuario.email,
      total: bebidasUsuario.length,
    }
  })

  
  return (
    <div className="text-center mt-6 text-gray-700">
      <h2 className="text-2xl font-bold mb-4">Ranking</h2>
      {resumenUsuarios.length === 0 ? (
        <p className="text-lg italic">Sin datos recientes 🚫</p>
      ) : (
        <PodioTop3 resumenUsuarios={resumenUsuarios} />
      )}
    </div>
  )
} 


export default Ranking
