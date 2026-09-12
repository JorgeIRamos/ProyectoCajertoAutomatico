export const validarNequi = (valor) => /^3\d{9}$/.test(valor);
export const validarCuentaAhorros = (valor) => /^\d{11}$/.test(valor);
export const validarCuentaAlaMano = (valor) => /^[01]3\d{9}$/.test(valor);

export function validarMonto(monto) {
  if (!Number.isInteger(monto) || monto <= 0 || monto % 10000 !== 0 || monto > 1000000) {
    return {
      valido: false,
      mensaje: "No se puede procesar este retiro con las denominaciones disponibles.",
    };
  }
  return { valido: true };
}

export function guardarNumero(numero) {
  sessionStorage.setItem("NumeroIngresado", numero);
}

export function obtenerNumero() {
  return sessionStorage.getItem("NumeroIngresado");
}

export function limpiarNumero() {
  sessionStorage.removeItem("NumeroIngresado");
}

export function guardarMonto(monto) {
  sessionStorage.setItem("MontoIngresado", monto);
}

export function obtenerMonto() {
  return sessionStorage.getItem("MontoIngresado");
}

export function limpiarMonto() {
  sessionStorage.removeItem("MontoIngresado");
}