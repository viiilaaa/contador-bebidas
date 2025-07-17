// src/components/Cerveceros.jsx
import React from 'react'
import { Bar } from 'react-chartjs-2'

function Cerveceros({ usuarios, bebidas }) {
  const cervezas = ['cerveza', 'litrona']

  const cerveceros = usuarios.map(usuario => {
    const cervezasUsuario = bebidas.filter(
      b => b.uid === usuario.id && cervezas.includes(b.tipo)
    )
    return { Nombre: usuario.Nombre, total: cervezasUsuario.length }
  })
    .filter(u => u.total > 0)
    .sort((a, b) => b.total - a.total)
    .slice(0, 10)

  const data = {
    labels: cerveceros.map(u => (u.Nombre)),
    datasets: [{
      label: 'Cervezas y Litronas consumidas',
      data: cerveceros.map(u => u.total),
      backgroundColor: '#f1c40f',
      borderRadius: 4,
    }]
  }

  const options = {
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
        precision: 0
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: ctx => `${ctx.parsed.x} bebidas`
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
  }

  return (
    <div className="mt-8 max-w-md mx-auto" style={{ height: 300 }}>
      <h3 className="text-xl font-semibold mb-4">Top Cerveceros 🍺</h3>
      <Bar data={data} options={options} />
    </div>
  )
}

export default Cerveceros
