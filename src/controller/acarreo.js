export const DENOMINACIONES = [100000, 50000, 20000, 10000];

const MATRIZ = [
  [true, true, true, true],
  [true, true, true, false],
  [true, true, false, false],
  [true, false, false, false],
];

export function calcularDesgloseAcarreo(montoObjetivo) {
  if (montoObjetivo <= 0 || montoObjetivo % 10000 !== 0) {
    return { error: true, mensaje: "El monto debe ser múltiplo de $10.000." };
  }

  let conteoFinal = [0, 0, 0, 0];
  let montoRestante = montoObjetivo;

  const LIMITE_ITERACIONES = 10000;
  let fila = 0;

  while (montoRestante > 0) {
    if (fila > LIMITE_ITERACIONES) {
      return { error: true, mensaje: "No se pudo calcular el desglose (límite de iteraciones excedido)." };
    }

    const mascara = MATRIZ[fila % MATRIZ.length];

    for (let i = DENOMINACIONES.length - 1; i >= 0; i--) {
      const den = DENOMINACIONES[i];
      if (mascara[i] && montoRestante >= den) {
        conteoFinal[i] += 1;
        montoRestante -= den;
      }
    }

    fila++;
  }

  return {
    error: false,
    conteo: conteoFinal,
  };
}
