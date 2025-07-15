function BebidaLista({ bebidas }) {
  return (
    <ul className="mt-4">
      {bebidas.map((bebida, i) => (
        <li key={i} className="border-b py-1">
          {bebida.tipo} — {new Date(bebida.timestamp).toLocaleString()}
        </li>
      ))}
    </ul>
  )
}

export default BebidaLista
