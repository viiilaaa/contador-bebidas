import RelUsuName from "./RelUsuName"

function EstadisticasGlobales({ bebidas }) {
  if (!bebidas.length) return <p>No hay datos aún.</p>

  const ahora = new Date()
  const horasLimite = 24

  // Agrupar bebidas por usuario
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

        // Resumen por tipo
        const resumen = recientes.reduce((acc, b) => {
          acc[b.tipo] = (acc[b.tipo] || 0) + 1
          return acc
        }, {})

        const resumenTexto = Object.entries(resumen)
          .map(([tipo, cantidad]) => `${cantidad} ${tipo}${cantidad > 1 ? "s" : ""}`)
          .join(", ")

        return (
          <div key={email} className="mb-4 border-b pb-2">
            <p className="font-semibold"><RelUsuName email={email} /></p>
            <p className="text-sm text-gray-600">
              Última bebida: {ultima.tipo} — {new Date(ultima.timestamp).toLocaleTimeString()}
            </p>
            <p className="text-sm mt-1">
              {recientes.length > 0
                ? `Últimas ${horasLimite}h: ${resumenTexto}`
                : <span className="italic text-gray-500">Sin datos recientes</span>}
            </p>
          </div>
        )
      })}
    </div>
  )
}

export default EstadisticasGlobales
