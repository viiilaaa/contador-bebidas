function EstadisticasGlobales({ bebidas }) {
  if (!bebidas.length) return <p>No hay datos aún.</p>

  const ahora = new Date()
  const horasLimite = 6

  // Agrupar bebidas por usuario (email)
  const agrupadas = bebidas.reduce((acc, bebida) => {
    const email = bebida.email || "Anónimo"
    if (!acc[email]) acc[email] = []
    acc[email].push(bebida)
    return acc
  }, {})

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-2">🌍 Estadísticas Globales</h2>
      {Object.entries(agrupadas).map(([email, lista]) => {
        const ultima = lista[0]
        const recientes = lista.filter(b => {
          const t = new Date(b.timestamp)
          return (ahora - t) / (1000 * 60 * 60) < horasLimite
        })

        return (
          <div key={email} className="mb-4 border-b pb-2">
            <p className="font-semibold">{email}</p>
            <p className="text-sm text-gray-600">
              Última bebida: {ultima.tipo} — {new Date(ultima.timestamp).toLocaleTimeString()}
            </p>
            <p className="text-sm mt-1">Últimas {horasLimite}h:</p>
            <ul className="text-sm pl-4 list-disc">
              {recientes.map((b, i) => (
                <li key={i}>
                  {b.tipo} — {new Date(b.timestamp).toLocaleTimeString()}
                </li>
              ))}
              {!recientes.length && <li className="italic text-gray-500">Sin datos recientes</li>}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

export default EstadisticasGlobales
