// src/components/HatTrick.jsx
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";

const HatTrick = ({ bebidasUsuario }) => {
  const [mostrar, setMostrar] = useState(false);
  const [yaMostrado, setYaMostrado] = useState(false);

  useEffect(() => {
    if (yaMostrado || bebidasUsuario.length < 3) return;

    const ahora = new Date();
    const dosHorasAtras = new Date(ahora.getTime() - 2 * 60 * 60 * 1000);

    const recientes = bebidasUsuario.filter(
      (b) => new Date(b.timestamp) > dosHorasAtras
    );

    if (recientes.length >= 3) {
      setMostrar(true);
      setYaMostrado(true);
    }
  }, [bebidasUsuario, yaMostrado]);

  if (!mostrar) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
      <Confetti />
      <div className="bg-white rounded-2xl p-8 max-w-sm text-center shadow-2xl animate-pulse">
        <h2 className="text-4xl font-extrabold text-yellow-500 mb-2">
          ⚽ Hat Trick!
        </h2>
        <p className="text-lg text-gray-700 mb-4">¡3 bebidas en menos de 2 horas!</p>
        <div className="text-6xl animate-bounce mb-4">🥳</div>
        <button
          onClick={() => setMostrar(false)}
          className="mt-4 px-5 py-2 bg-yellow-500 text-white font-semibold rounded hover:bg-yellow-600 transition"
        >
          ¡Vamos!
        </button>
      </div>
    </div>
  );
};

export default HatTrick;
