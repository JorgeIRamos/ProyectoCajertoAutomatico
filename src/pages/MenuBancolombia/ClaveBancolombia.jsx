import { useState } from 'react'
import './menu-bancolombia.css'
import { useNavigate } from 'react-router-dom'

const LONGITUD_CLAVE = 4
const CLAVE_REAL = '2035'

function ClaveBancolombia() {
  const [clave, setClave] = useState('')
  const navigate = useNavigate();
  const [error, setError] = useState("");

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
      setError("Debes ingresar los 4 dígitos.");
      return;
    }

    if (clave !== CLAVE_REAL) {
      setError("La clave ingresada no coincide.");
      setClave("");
      return;
    }
    navigate('/bancolombia/retiro');
  }
  return (
    <div className="menu-bancolombia">
      <div className="menu-bancolombia__marco">
        <div className="menu-bancolombia__pantalla">
          <header className="menu-bancolombia__cabecera menu-bancolombia__cabecera--clave">
            <h1 className="menu-bancolombia__instruccion">Escribe tu contraseña</h1>
          </header>

          <section className="menu-bancolombia__contenido menu-bancolombia__contenido--clave">
            <div className="menu-bancolombia__pin" aria-label="Contraseña">
              <div className="menu-bancolombia__pin-casilla">
                <span className="menu-bancolombia__pin-valor">{clave[0] ? '*' : ''}</span>
                <span className="menu-bancolombia__pin-linea" />
              </div>
              <div className="menu-bancolombia__pin-casilla">
                <span className="menu-bancolombia__pin-valor">{clave[1] ? '*' : ''}</span>
                <span className="menu-bancolombia__pin-linea" />
              </div>
              <div className="menu-bancolombia__pin-casilla">
                <span className="menu-bancolombia__pin-valor">{clave[2] ? '*' : ''}</span>
                <span className="menu-bancolombia__pin-linea" />
              </div>
              <div className="menu-bancolombia__pin-casilla">
                <span className="menu-bancolombia__pin-valor">{clave[3] ? '*' : ''}</span>
                <span className="menu-bancolombia__pin-linea" />
              </div>
            </div>

            {error && <p className="menu-bancolombia__error">{error}</p>}

            <div className="menu-bancolombia__teclado">
              <button type="button" className="menu-bancolombia__tecla" onClick={() => agregarDigito('1')}>
                1
              </button>
              <button type="button" className="menu-bancolombia__tecla" onClick={() => agregarDigito('2')}>
                2
              </button>
              <button type="button" className="menu-bancolombia__tecla" onClick={() => agregarDigito('3')}>
                3
              </button>

              <button type="button" className="menu-bancolombia__tecla" onClick={() => agregarDigito('4')}>
                4
              </button>
              <button type="button" className="menu-bancolombia__tecla" onClick={() => agregarDigito('5')}>
                5
              </button>
              <button type="button" className="menu-bancolombia__tecla" onClick={() => agregarDigito('6')}>
                6
              </button>

              <button type="button" className="menu-bancolombia__tecla" onClick={() => agregarDigito('7')}>
                7
              </button>
              <button type="button" className="menu-bancolombia__tecla" onClick={() => agregarDigito('8')}>
                8
              </button>
              <button type="button" className="menu-bancolombia__tecla" onClick={() => agregarDigito('9')}>
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

              <button type="button" className="menu-bancolombia__tecla" onClick={() => agregarDigito('0')}>
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

export default ClaveBancolombia
