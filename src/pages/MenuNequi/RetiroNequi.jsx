import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './menu-nequi.css'
import { validarMonto, guardarMonto } from '../../controller/validacion'
import { limpiarNumero } from '../../controller/validacion'

const MONTOS = [10000, 20000, 50000, 100000]

function RetiroNequi() {
  const [mostrarOtro, setMostrarOtro] = useState(false)
  const [montoPersonalizado, setMontoPersonalizado] = useState('')
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const volverAMontos = () => {
    setMostrarOtro(false)
    setMontoPersonalizado('')
  }

  const procesarMonto = (monto) => {
    const { valido, mensaje } = validarMonto(monto)
    if (!valido) {
      setError(mensaje);
      return;
    }
    guardarMonto(monto);
    navigate('/nequi/reporte');
  };


  const aceptarError = () => {
    limpiarNumero();
    navigate('/');
  }


  const manejarConfirmarOtro = () => {
    const monto = Number(montoPersonalizado)
    if (!montoPersonalizado || monto <= 0) {
      const { mensaje } = validarMonto(monto)
      setError(mensaje)
      return
    }
    procesarMonto(monto)
  }


  return (
    <div className="menu-nequi">

      <div className="menu-nequi__marco">
        <div className="menu-nequi__pantalla">
          {error ? (
            <>
              <header className="menu-nequi__cabecera menu-nequi__cabecera--retiro">
                <h1 className="menu-nequi__titulo menu-nequi__titulo--retiro">
                  {error}
                </h1>
              </header>
              <section className="menu-nequi__custom">
                <button
                  type="button"
                  className="menu-nequi__boton menu-nequi__boton--confirmar"
                  onClick={aceptarError}
                >
                  Aceptar
                </button>
              </section>
            </>
          ) : !mostrarOtro ? (
            <>
              <header className="menu-nequi__cabecera menu-nequi__cabecera--retiro">
                <h1 className="menu-nequi__titulo menu-nequi__titulo--retiro">
                  Monto de transacción
                </h1>
              </header>

              <section className="menu-nequi__grid-montos" aria-label="Montos disponibles">
                {MONTOS.map((monto) => (
                  <button key={monto} type="button" className="menu-nequi__monto" onClick={() => procesarMonto(monto)}>
                    ${monto.toLocaleString('es-CO')}
                  </button>
                ))}

                <button
                  type="button"
                  className="menu-nequi__monto menu-nequi__monto--otro"
                  onClick={() => setMostrarOtro(true)}
                >
                  OTRO
                </button>
              </section>
            </>
          ) : (
            
            <>
              <header className="menu-nequi__cabecera menu-nequi__cabecera--retiro">
                <h1 className="menu-nequi__titulo menu-nequi__titulo--retiro">
                  Monto de transacción
                </h1>
              </header>

              <section className="menu-nequi__custom" aria-label="Monto personalizado">
                <label className="menu-nequi__custom-label" htmlFor="monto-personalizado">
                  Digite el monto
                </label>

                <input
                  id="monto-personalizado"
                  type="number"
                  className="menu-nequi__custom-input"
                  value={montoPersonalizado}
                  onChange={(event) => setMontoPersonalizado(event.target.value)}
                  placeholder="$0"
                />

                <div className="menu-nequi__acciones">
                  <button type="button" className="menu-nequi__boton menu-nequi__boton--confirmar" onClick={manejarConfirmarOtro}>
                    Confirmar
                  </button>
                  <button
                    type="button"
                    className="menu-nequi__boton menu-nequi__boton--cancelar"
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

export default RetiroNequi
