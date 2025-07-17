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

  // Para la gráfica de últimas 24h, calculamos resumen por tipo en las 24h
  const bebidas24h = bebidas.filter(b => {
    const t = new Date(b.timestamp)
    return (ahora - t) / (1000 * 60 * 60) < ultimas24h
  })

  const resumen24h = bebidas24h.reduce((acc, b) => {
    acc[b.tipo] = (acc[b.tipo] || 0) + 1
    return acc
  }, {})

  // Datos para gráfica horizontal
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
    indexAxis: 'y', // Aquí indicamos que sea horizontal
    scales: {
      x: { beginAtZero: true, ticks: { stepSize: 1 } }
    },
    plugins: {
      legend: { display: false }
    }
  }

  // También mantienes la gráfica por horas que ya tenías:
  const horas = Array.from({ length: 24 }, (_, i) => i)
  const bebidasPorHora = Array(24).fill(0)
  bebidas.forEach(b => {
    const fecha = new Date(b.timestamp)
    const diffH = (ahora - fecha) / (1000 * 60 * 60)
    if (diffH < ultimas24h) {
      const hora = fecha.getHours()
      bebidasPorHora[hora]++
    }
  })

  const dataHoras = {
    labels: horas.map(h => `${h}:00`),
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
      <h2 className="text-lg font-bold mb-2">📊 Tus estadísticas</h2>
      <p>Última bebida: {ultima.tipo} — {new Date(ultima.timestamp).toLocaleTimeString()}</p>
      <p>Bebidas en las últimas {horasLimite}h:</p>
      <ul className="list-disc pl-4 text-sm text-gray-700 mb-2">
        {Object.entries(resumenTipos).map(([tipo, count]) => (
          <li key={tipo}>
            {tipo}s: {count}
          </li>
        ))}
      </ul>

      <p className="text-sm mt-4 font-semibold">Bebidas en las últimas 24h (por tipo):</p>
      <div className="bg-white rounded p-2 mt-2">
        <Bar data={data} options={options} />
      </div>

      <p className="text-sm mt-4 font-semibold">Bebidas en las últimas 24h (por hora):</p>
      <div className="bg-white rounded p-2 mt-2">
        <Bar data={dataHoras} options={optionsHoras} />
      </div>
    </div>
  )
}

export default EstadisticasUsuario
