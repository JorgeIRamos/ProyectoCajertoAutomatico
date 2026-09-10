export const DENOMINACIONES = [100000, 50000, 20000, 10000];

const BLOQUES = [
  [
    [1, 1, 1, 1],
    [1, 1, 1, 0],
    [1, 1, 0, 0],
    [1, 0, 0, 0],
  ],
  [
    [0, 1, 1, 1],
    [0, 1, 1, 0],
    [0, 1, 0, 0],
  ],
  [
    [0, 0, 1, 1],
    [0, 0, 1, 0],
  ],
  [
    [0, 0, 0, 1],
  ],
];

function calcularValorFila(fila) {
  return fila.reduce((total, bit, i) => total + bit * DENOMINACIONES[i], 0);
}

function sumarVector(conteo, fila) {
  return conteo.map((valor, i) => valor + fila[i]);
}

export function calcularDesgloseAcarreo(montoObjetivo) {
  let conteoFinal = [0, 0, 0, 0];
  let montoRestante = montoObjetivo;

  const LIMITE_ITERACIONES = 10000;
  let iteraciones = 0;

  while (montoRestante > 0) {
    iteraciones++;
    if (iteraciones > LIMITE_ITERACIONES) {
      return { error: true, mensaje: "No se pudo calcular el desglose (límite de iteraciones excedido)." };
    }

    let bloqueIdx = 0;
    let seReinicioCiclo = false;

    while (bloqueIdx < 4 && montoRestante > 0) {
      const bloqueActual = BLOQUES[bloqueIdx];
      let bloqueCompletadoLimpio = true;

      for (const fila of bloqueActual) {
        const valorFila = calcularValorFila(fila);

        if (valorFila <= montoRestante) {
          montoRestante -= valorFila;
          conteoFinal = sumarVector(conteoFinal, fila);
        } else {
          bloqueCompletadoLimpio = false;
          break;
        }
      }

      if (bloqueCompletadoLimpio) {
        seReinicioCiclo = true;
        break;
      } else {
        bloqueIdx += 1;
      }
    }

    if (!seReinicioCiclo && bloqueIdx === 4 && montoRestante > 0) {
      return {
        error: true,
        mensaje: "El monto restante no es múltiplo exacto de las denominaciones.",
      };
    }
  }

  return {
    error: false,
    conteo: conteoFinal, 
  };
}