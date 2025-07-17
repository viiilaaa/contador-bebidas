import RelUsuName from "./RelUsuName"
import GraficoPorTipo from "./GraficoPorTipo"

function EstadisticasGlobales({ bebidas, usuarios }) {
  const ahora = new Date()
  const horasLimite = 24

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-2">🌍 Estadísticas Globales</h2>
      {usuarios.map((usuario) => {
        const email = usuario.email
        const lista = bebidas.filter(b => b.email === email)

        const recientes = lista.filter(b => {
          const t = new Date(b.timestamp)
          return (ahora - t) / (1000 * 60 * 60) < horasLimite
        })

        const ultima = lista[0]

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
            {ultima ? (
              <>
                <p className="text-sm text-gray-600">
                  Última bebida: {ultima.tipo} — {new Date(ultima.timestamp).toLocaleTimeString()}
                </p>
                <p className="text-sm mt-1">
                  {recientes.length > 0
                    ? `Últimas ${horasLimite}h: ${resumenTexto}`
                    : <span className="italic text-gray-500">Sin datos recientes</span>}
                </p>
                <GraficoPorTipo bebidas={recientes} />
              </>
            ) : (
              <p className="text-sm italic text-gray-500">Este usuario aún no ha registrado bebidas.</p>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default EstadisticasGlobales
