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

function GraficoPorTipo({ bebidas }) {
  if (!bebidas.length) return <p className="text-sm italic">Sin datos.</p>

  const resumen = bebidas.reduce((acc, b) => {
    acc[b.tipo] = (acc[b.tipo] || 0) + 1
    return acc
  }, {})

  const labels = Object.keys(resumen)
  const dataValores = Object.values(resumen)

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

  return (
    <div className="bg-white rounded p-2 mt-2">
      <Bar data={data} options={options} />
    </div>
  )
}

export default GraficoPorTipo
