import { useState } from 'react'
import './menu-bancolombia.css'
import { useNavigate } from 'react-router-dom'
import { validarMonto, limpiarNumero } from '../../controller/validacion'
import { guardarMonto } from '../../controller/validacion'

const MONTOS = [10000, 20000, 50000, 100000]

function RetiroBancolombia() {
  const [mostrarOtro, setMostrarOtro] = useState(false)
  const [montoPersonalizado, setMontoPersonalizado] = useState('')
  const [error, setError] = useState("");
  const [montoconfirmado, setMontoConfirmado] = useState(null);
  const navigate = useNavigate();

  const volverAMontos = () => {
    setMostrarOtro(false)
    setMontoPersonalizado('')
  }

  const procesarMonto = (monto) => {
    const { valido, mensaje } = validarMonto(monto)
    if (!valido) {
      setError(mensaje);
      setMontoConfirmado(null);
      return;
    }
    setMontoConfirmado(monto);
    guardarMonto(monto);
    navigate('/bancolombia/reporte');
  }

  const aceptarError = () => {
    limpiarNumero();
    navigate('/');
  }

  const manejarConfirmarOtro = () => {
    const monto = Number(montoPersonalizado)
    if (!montoPersonalizado || monto <= 0) {
      setError(mensaje)
      return
    }
    procesarMonto(monto)
  }

  return (
    <div className="menu-bancolombia">
      <div className="menu-bancolombia__marco">
        <div className="menu-bancolombia__pantalla">
          {error ? (
            <>
              <header className="menu-bancolombia__cabecera menu-bancolombia__cabecera--retiro">
                <h1 className="menu-bancolombia__titulo menu-bancolombia__titulo--retiro">
                  {error}
                </h1>
              </header>
              <section className="menu-bancolombia__custom">
                <button onClick={aceptarError}>Aceptar</button>
              </section>
            </>
          ) :!mostrarOtro ? (
            <>
              <header className="menu-bancolombia__cabecera menu-bancolombia__cabecera--retiro">
                <h1 className="menu-bancolombia__titulo menu-bancolombia__titulo--retiro">
                  Monto de transacción
                </h1>
              </header>

              <section className="menu-bancolombia__grid-montos" aria-label="Montos disponibles">
                {MONTOS.map((monto) => (
                  <button key={monto} type="button" className="menu-bancolombia__monto" onClick={() => procesarMonto(monto)}>
                    ${monto.toLocaleString('es-CO')}
                  </button>
                ))}

                <button
                  type="button"
                  className="menu-bancolombia__monto menu-bancolombia__monto--otro"
                  onClick={() => setMostrarOtro(true)}
                >
                  OTRO
                </button>
              </section>
            </>
          ) : (
            <>
              <header className="menu-bancolombia__cabecera menu-bancolombia__cabecera--retiro">
                <h1 className="menu-bancolombia__titulo menu-bancolombia__titulo--retiro">
                  Monto de transacción
                </h1>
              </header>

              <section className="menu-bancolombia__custom" aria-label="Monto personalizado">
                <label className="menu-bancolombia__custom-label" htmlFor="monto-personalizado">
                  Digite el monto
                </label>

                <input
                  id="monto-personalizado"
                  type="number"
                  className="menu-bancolombia__custom-input"
                  value={montoPersonalizado}
                  onChange={(event) => setMontoPersonalizado(event.target.value)}
                  placeholder="$0"
                />

                <div className="menu-bancolombia__acciones">
                  <button type="button" className="menu-bancolombia__boton menu-bancolombia__boton--confirmar" onClick={manejarConfirmarOtro}>
                    Confirmar
                  </button>
                  <button
                    type="button"
                    className="menu-bancolombia__boton menu-bancolombia__boton--cancelar"
                    onClick={volverAMontos}
                  >
                    Cancelar
                  </button>
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default RetiroBancolombia
