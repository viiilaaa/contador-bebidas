const usuarios = {
  "vilari.ser@gmail.com": "Sergio",
  "iriasanchezgarcia@gmail.com": "Iria",
  "antonlopezleal2@gmail.com": "Toni",
  "pablorodriguezlopez190@gmail.com": "Pablo",
  "markusweber192@gmail.com": "Marco",
  "rubensanchezgarcia10@gmail.com": "Rubén",
  "hugoby888@gmail.com": "Hugo"
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
