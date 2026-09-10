import { calcularDesgloseAcarreo, DENOMINACIONES } from "./acarreo";
import { inventario } from "./inventario";

export function predecirTransacciones(montoSolicitado, inv = inventario) {
  const desglose = calcularDesgloseAcarreo(montoSolicitado);

  if (desglose.error) {
    return { error: true, mensaje: desglose.mensaje };
  }

  const disponible = DENOMINACIONES.map((d) => inv[d] ?? 0); // ← sin dividir entre 1000
  const requerido = desglose.conteo;

  let transacciones = 0;

  while (disponible.every((v, i) => v >= requerido[i])) {
    for (let i = 0; i < disponible.length; i++) {
      disponible[i] -= requerido[i];
    }
    transacciones++;
  }

  const inventarioRestante = {};
  DENOMINACIONES.forEach((d, i) => {
    inventarioRestante[d] = disponible[i]; // ← también sin dividir
  });

  const montoRemanente = disponible.reduce(
    (total, cant, i) => total + cant * DENOMINACIONES[i],
    0
  );

  return {
    error: false,
    transaccionesPosibles: transacciones,
    inventarioRestante,
    montoRemanenteEnCaja: montoRemanente,
  };
}