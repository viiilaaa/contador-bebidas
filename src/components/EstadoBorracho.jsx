import { useEffect, useState } from "react";

function EstadoBorracho({ bebidasUsuario }) {
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    
    if (!bebidasUsuario || bebidasUsuario.length === 0) {
      setMensaje(""); // No hay bebidas, no mostramos mensaje
      return;
    }

    const ultimaBebida = new Date(bebidasUsuario[0].timestamp); // asumiendo orden descendente
    const ahora = new Date();
    const diffHoras = (ahora - ultimaBebida) / (1000 * 60 * 60);

    if (diffHoras > 12) {
      setMensaje("¡Ya llevas más de 12 horas sobrio! Te dormiste? 😴");
    } else if (diffHoras > 6) {
      setMensaje("¡Más de 6 horas sin beber, todo un logro! 🎉");
    } else if (diffHoras > 3) {
      setMensaje("Llevas más de 3 horas sin beber. Una copita? 🍹");
    } else {
      setMensaje(""); // o algún mensaje neutral
    }
  }, [bebidasUsuario]);

  if (!mensaje) return null;

  return (
    <div className="p-3 rounded text-gray-800 mb-4 text-center font-semibold">
      {mensaje}
    </div>
  );
}

export default EstadoBorracho;