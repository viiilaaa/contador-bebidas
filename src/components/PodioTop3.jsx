import RelUsuName from "./RelUsuName"
function PodioTop3({ resumenUsuarios }) {

  // Ordenamos por cantidad descendente
  const top3 = [...resumenUsuarios]
    .sort((a, b) => b.total - a.total)
    .slice(0, 3)

  const posiciones = ["🥇", "🥈", "🥉"]
  
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">🏆 Top 3 Borrachos (24h)</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {top3.map((usuario, idx) => (
          <div
            key={usuario.uid}
            className={`p-4 rounded shadow text-center ${
              idx === 0 ? "bg-yellow-200" : idx === 1 ? "bg-gray-300" : "bg-orange-300"
            }`}
          >
            <div className="text-3xl">{posiciones[idx]}</div>
            <div className="text-lg font-semibold mt-2">{usuario.Nombre}</div>
            <div className="text-sm text-gray-700 mt-1">{usuario.total} bebidas</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PodioTop3