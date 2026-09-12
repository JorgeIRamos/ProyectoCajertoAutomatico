import { useState } from 'react'
import './menu-alamano.css'
import { useNavigate } from 'react-router-dom'
import { validarMonto, limpiarNumero } from '../../controller/validacion'
import { guardarMonto } from '../../controller/validacion'

const MONTOS = [10000, 20000, 50000, 100000]

function RetiroAlaMano() {
  const [mostrarOtro, setMostrarOtro] = useState(false)
  const [montoPersonalizado, setMontoPersonalizado] = useState('')
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
    navigate('/alamano/reporte');
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
    <div className="menu-alamano">
      <div className="menu-alamano__marco">
        <div className="menu-alamano__pantalla">
          {error ? (
            <>
              <header className="menu-alamano__cabecera menu-alamano__cabecera--retiro">
                <h1 className="menu-alamano__titulo menu-alamano__titulo--retiro">
                  {error}
                </h1>
              </header>
              <section className="menu-alamano__custom">
                <button onClick={aceptarError}>Aceptar</button>
              </section>
            </>
          ) : !mostrarOtro ? (
            <>
              <header className="menu-alamano__cabecera menu-alamano__cabecera--retiro">
                <h1 className="menu-alamano__titulo menu-alamano__titulo--retiro">
                  Monto de transacción
                </h1>
              </header>

              <section className="menu-alamano__grid-montos" aria-label="Montos disponibles">
                {MONTOS.map((monto) => (
                  <button key={monto} type="button" className="menu-alamano__monto" onClick={() => procesarMonto(monto)}>
                    ${monto.toLocaleString('es-CO')}
                  </button>
                ))}

                <button
                  type="button"
                  className="menu-alamano__monto menu-alamano__monto--otro"
                  onClick={() => setMostrarOtro(true)}
                >
                  OTRO
                </button>
              </section>
            </>
          ) : (
            <>
              <header className="menu-alamano__cabecera menu-alamano__cabecera--retiro">
                <h1 className="menu-alamano__titulo menu-alamano__titulo--retiro">
                  Monto de transacción
                </h1>
              </header>

              <section className="menu-alamano__custom" aria-label="Monto personalizado">
                <label className="menu-alamano__custom-label" htmlFor="monto-personalizado">
                  Digite el monto
                </label>

                <input
                  id="monto-personalizado"
                  type="number"
                  className="menu-alamano__custom-input"
                  value={montoPersonalizado}
                  onChange={(event) => setMontoPersonalizado(event.target.value)}
                  placeholder="$0"
                />

                <div className="menu-alamano__acciones">
                  <button type="button" className="menu-alamano__boton menu-alamano__boton--confirmar" onClick={manejarConfirmarOtro}>
                    Confirmar
                  </button>
                  <button
                    type="button"
                    className="menu-alamano__boton menu-alamano__boton--cancelar"
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

export default RetiroAlaMano
