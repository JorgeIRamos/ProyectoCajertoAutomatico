import { useState } from 'react'
import './menu-nequi.css'
import PanelClaveDinamica from './PanelClaveDinamica'
import { useNavigate } from 'react-router-dom'
import { ClaveDinamica } from "../../controller/clavedinamica";

const LONGITUD_CLAVE = 6

function ClaveNequi() {
  const { clave: claveReal, tiempoRestante } = ClaveDinamica(60);
  const [clave, setClave] = useState('')
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const agregarDigito = (digito) => {
    if (clave.length < LONGITUD_CLAVE) {
      setClave((actual) => actual + digito)
    }
  }

  const borrarDigito = () => {
    setClave((actual) => actual.slice(0, -1))
  }

  const manejarenvio = () => {
    if (clave.length !== LONGITUD_CLAVE) {
      setError("Debes ingresar los 6 dígitos.");
      return;
    }

    if (clave !== claveReal) {
      setError("La clave ingresada no coincide.");
      setClave("");
      return;
    }

    navigate("/nequi/retiro");

  }

  return (
    <div className="menu-nequi">
      <PanelClaveDinamica clave={claveReal} tiempoRestante={tiempoRestante} />

      <div className="menu-nequi__marco">
        <div className="menu-nequi__pantalla">
          <header className="menu-nequi__cabecera menu-nequi__cabecera--clave">
            <h1 className="menu-nequi__instruccion">DIGITE LA CLAVE DINÁMICA</h1>
          </header>

          <section className="menu-nequi__contenido menu-nequi__contenido--clave">
            <div className="menu-nequi__pin" aria-label="Contraseña">
              <div className="menu-nequi__pin-casilla">
                <span className="menu-nequi__pin-valor">{clave[0] ? '*' : ''}</span>
                <span className="menu-nequi__pin-linea" />
              </div>
              <div className="menu-nequi__pin-casilla">
                <span className="menu-nequi__pin-valor">{clave[1] ? '*' : ''}</span>
                <span className="menu-nequi__pin-linea" />
              </div>
              <div className="menu-nequi__pin-casilla">
                <span className="menu-nequi__pin-valor">{clave[2] ? '*' : ''}</span>
                <span className="menu-nequi__pin-linea" />
              </div>
              <div className="menu-nequi__pin-casilla">
                <span className="menu-nequi__pin-valor">{clave[3] ? '*' : ''}</span>
                <span className="menu-nequi__pin-linea" />
              </div>
              <div className="menu-nequi__pin-casilla">
                <span className="menu-nequi__pin-valor">{clave[4] ? '*' : ''}</span>
                <span className="menu-nequi__pin-linea" />
              </div>
              <div className="menu-nequi__pin-casilla">
                <span className="menu-nequi__pin-valor">{clave[5] ? '*' : ''}</span>
                <span className="menu-nequi__pin-linea" />
              </div>
            </div>

            {error && <p className="menu-nequi__error">{error}</p>}

            <div className="menu-nequi__teclado">
              <button type="button" className="menu-nequi__tecla" onClick={() => agregarDigito('1')}>
                1
              </button>
              <button type="button" className="menu-nequi__tecla" onClick={() => agregarDigito('2')}>
                2
              </button>
              <button type="button" className="menu-nequi__tecla" onClick={() => agregarDigito('3')}>
                3
              </button>

              <button type="button" className="menu-nequi__tecla" onClick={() => agregarDigito('4')}>
                4
              </button>
              <button type="button" className="menu-nequi__tecla" onClick={() => agregarDigito('5')}>
                5
              </button>
              <button type="button" className="menu-nequi__tecla" onClick={() => agregarDigito('6')}>
                6
              </button>

              <button type="button" className="menu-nequi__tecla" onClick={() => agregarDigito('7')}>
                7
              </button>
              <button type="button" className="menu-nequi__tecla" onClick={() => agregarDigito('8')}>
                8
              </button>
              <button type="button" className="menu-nequi__tecla" onClick={() => agregarDigito('9')}>
                9
              </button>

              <button
                type="button"
                className="menu-nequi__tecla menu-nequi__tecla--borrar"
                onClick={borrarDigito}
                aria-label="Borrar"
              >
                ⌫
              </button>

              <button type="button" className="menu-nequi__tecla" onClick={() => agregarDigito('0')}>
                0
              </button>

            <button
              type="button"
              className="menu-nequi__tecla menu-nequi__tecla--enviar"
              onClick={manejarenvio}
              aria-label="Enviar"
            >
              →
            </button>
          </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default ClaveNequi
