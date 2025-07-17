const usuarios ={
    "vilari.ser@gmail.com": "Sergio",
    "iriasanchezgarcia@gmail.com": "Iria"
}

function RelUsuName({ email }) {
  const nombre = usuarios[email] || "Usuario Desconocido";

  return (
    <span className="text-gray-700 font-semibold">
      {nombre}
    </span>
  );
}

export default RelUsuName;