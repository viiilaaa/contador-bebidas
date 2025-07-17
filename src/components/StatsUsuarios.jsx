import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js"

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

function EstadisticasUsuario({ bebidas }) {
  if (!bebidas.length) return <p className="mt-4 text-sm">No has añadido bebidas aún.</p>

  const ahora = new Date()
  const horasLimite = 6
  const ultimas24h = 24

  const ultima = bebidas[0]

  const recientes = bebidas.filter(b => {
    const t = new Date(b.timestamp)
    return (ahora - t) / (1000 * 60 * 60) < horasLimite
  })

  const resumenTipos = recientes.reduce((acc, b) => {
    acc[b.tipo] = (acc[b.tipo] || 0) + 1
    return acc
  }, {})

  const bebidas24h = bebidas.filter(b => {
    const t = new Date(b.timestamp)
    return (ahora - t) / (1000 * 60 * 60) < ultimas24h
  })

  const resumen24h = bebidas24h.reduce((acc, b) => {
    acc[b.tipo] = (acc[b.tipo] || 0) + 1
    return acc
  }, {})

  // Gráfica horizontal por tipo
  const labels = Object.keys(resumen24h)
  const dataValores = Object.values(resumen24h)

  const data = {
    labels,
    datasets: [
      {
        label: "Cantidad",
        data: dataValores,
        backgroundColor: "rgba(59, 130, 246, 0.6)",
        borderRadius: 4
      }
    ]
  }

  const options = {
    indexAxis: 'y',
    scales: {
      x: { beginAtZero: true, ticks: { stepSize: 1 } }
    },
    plugins: {
      legend: { display: false }
    }
  }

  // Gráfica por hora: últimas 24h reales
    const now = new Date()

    // Recorta "ahora" a la próxima hora en punto (ej. 11:50 → 12:00)
    const horaSiguiente = new Date(now)
    horaSiguiente.setMinutes(0, 0, 0)
    horaSiguiente.setHours(horaSiguiente.getHours() + 1)

    // Generar bloques de 1 hora desde la próxima hora en punto hacia atrás
    const bloques = Array.from({ length: 24 }, (_, i) => {
      const tFin = new Date(horaSiguiente.getTime() - i * 60 * 60 * 1000)
      const tInicio = new Date(tFin.getTime() - 60 * 60 * 1000)
      return { tInicio, tFin }
    }).reverse()



  const bebidasPorHora = bloques.map(({ tInicio, tFin }) =>
    bebidas.filter(b => {
      const t = new Date(b.timestamp)
      return t >= tInicio && t < tFin
    }).length
  )

  const labelsHoras = bloques.map(({ tInicio }) => {
    const h = tInicio.getHours()
    return `${h}:00`
  })

  const dataHoras = {
    labels: labelsHoras,
    datasets: [
      {
        label: "Bebidas por hora",
        data: bebidasPorHora,
        backgroundColor: "rgba(59, 130, 246, 0.6)",
        borderRadius: 4
      }
    ]
  }

  const optionsHoras = {
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 } }
    }
  }

  return (
    <div className="mt-6">
      <h2 className=" text-center text-lg font-bold mb-2">📊 Tus estadísticas</h2>
      <p>Última bebida: {ultima.tipo} — {new Date(ultima.timestamp).toLocaleTimeString()}</p>
      <p>Bebidas en las últimas {horasLimite}h:</p>
      <ul className="list-disc pl-4 text-sm text-gray-700 mb-2">
        {Object.entries(resumenTipos).map(([tipo, count]) => (
          <li key={tipo}>
            {tipo}s: {count}
          </li>
        ))}
      </ul>

      <p className="text-center text-sm mt-4 font-semibold">Bebidas en las últimas 24h (por tipo):</p>
      <div className="bg-white rounded p-2 mt-2">
        <Bar data={data} options={options} />
      </div>

      <p className="text-center text-sm mt-4 font-semibold">Bebidas en las últimas 24h (por hora):</p>
      <div className="bg-white rounded p-2 mt-2">
        <Bar data={dataHoras} options={optionsHoras} />
      </div>

    </div>
  )
}

export default EstadisticasUsuario
