import { Pie } from 'react-chartjs-2'
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { useMemo } from 'react'
import PodioTop3 from './PodioTop3'
import Cerveceros from "./Cerveceros"

Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels)

function relusu(email) {
  return email.split('@')[0]
}

function Ranking({ usuarios, bebidas }) {
  const ahora = new Date()
  const hace24h = new Date(ahora.getTime() - 24 * 60 * 60 * 1000)

  const resumenUsuarios = useMemo(() => {
    return usuarios.map((usuario) => {
      const bebidasUsuario = bebidas.filter(
        (b) => b.uid === usuario.id && new Date(b.timestamp) > hace24h
      )
      return {
        uid: usuario.id,
        Nombre: usuario.Nombre,
        total: bebidasUsuario.length,
      }
    }).filter(u => u.total > 0)
  }, [usuarios, bebidas, hace24h])

  const dataPie = {
    labels: resumenUsuarios.map(u => u.Nombre),
    datasets: [
      {
        label: 'Bebidas (últimas 24h)',
        data: resumenUsuarios.map(u => u.total),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
          '#FF9F40', '#C9CBCF', '#8A8D91', '#FF5A5F', '#00A699',
        ],
        borderWidth: 1,
      }
    ]
  }

  const optionsPie = {
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `${relusu(ctx.label)}: ${ctx.parsed} bebidas`
        }
      }
    }  }


  return (
    <div className="text-center mt-6 text-gray-700">
      <h2 className="text-2xl font-bold mb-4">Ranking</h2>
      {resumenUsuarios.length === 0 ? (
        <p className="text-lg italic">Sin datos recientes 🚫</p>
      ) : (
        <>
          <PodioTop3 resumenUsuarios={resumenUsuarios} />
          <div className="max-w-md mx-auto mt-8">
            <h3 className="text-xl font-semibold mb-2">Proporción de bebidas</h3>
            <div style={{ width: 200, height: 200, margin: "auto", marginTop: 24 }}>
              <Pie 
                data={dataPie} 
                options={optionsPie} 
                width={150} 
                height={150} 
                // el prop 'maintainAspectRatio: false' ayuda a usar tamaño exacto
              />
            </div>
          </div>
          <Cerveceros usuarios={usuarios} bebidas={bebidas}/>
        </>
      )}
    </div>
  )
}

export default Ranking
