function EstadisticasUsuario({ bebidas }) {
  if (!bebidas.length) return <p className="mt-4 text-sm">No has añadido bebidas aún.</p>

  const ultima = bebidas[0]
  const ahora = new Date()
  const horasLimite = 6

  const recientes = bebidas.filter(b => {
    const t = new Date(b.timestamp)
    return (ahora - t) / (1000 * 60 * 60) < horasLimite
  })

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-2">📊 Tus estadísticas</h2>
      <p>Última bebida: {ultima.tipo} — {new Date(ultima.timestamp).toLocaleTimeString()}</p>
      <p>Bebidas en las últimas {horasLimite}h:</p>
      <ul className="list-disc pl-4 text-sm text-gray-700">
        {recientes.map((b, i) => (
          <li key={i}>
            {b.tipo} — {new Date(b.timestamp).toLocaleTimeString()}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default EstadisticasUsuario
