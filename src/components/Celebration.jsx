import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

function Celebration({ totalBebidas }) {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (totalBebidas === 3 || totalBebidas === 5) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000); // 5 segundos
      return () => clearTimeout(timer);
    }
  }, [totalBebidas]);

  if (!showConfetti) return null;

  return <Confetti width={width} height={height} />;
}

export default Celebration;
