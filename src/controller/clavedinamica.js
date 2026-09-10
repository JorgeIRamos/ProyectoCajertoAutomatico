import { useState, useEffect } from "react";

export const generarClave = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

export const ClaveDinamica = (duracionClave = 60) => {
  const [clave, setClave] = useState(generarClave());
  const [tiempoRestante, setTiempoRestante] = useState(duracionClave);

  useEffect(() => {
    const interval = setInterval(() => {
      setTiempoRestante((prevTiempo) => {
        if (prevTiempo <= 1) {
          setClave(generarClave());
          return duracionClave;
        }
        return prevTiempo - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [duracionClave]);

    return { clave, tiempoRestante };
};