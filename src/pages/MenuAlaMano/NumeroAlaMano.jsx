import './menu-alamano.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { validarCuentaAlaMano, guardarNumero } from '../../controller/validacion'

function NumeroAlaMano() {
  const navigate = useNavigate();
  const [numero, setNumero] = useState("");
  const [error, setError] = useState("");

  const manejarcambio = (e) => {
    const soloNumeros = e.target.value.replace(/\D/g, "");
    setNumero(soloNumeros);
    setError("");
  }

  const manejarenvio = () => {
    if (!validarCuentaAlaMano(numero)) {
      setError("El número debe tener 11 dígitos, empezar en 0 o 1, y el segundo dígito debe ser 3.");
      return;
    }
    guardarNumero(numero);
    navigate('/alamano/clave');
  }

  return (
    <div className="menu-alamano">
      <div className="menu-alamano__marco">
        <div className="menu-alamano__pantalla">
          <header className="menu-alamano__cabecera">
            <h1 className="menu-alamano__titulo">Retiros A la mano</h1>
          </header>

          <section className="menu-alamano__contenido">
            <input
              type="text"
              className="menu-alamano__input"
              placeholder="Digite su número de teléfono"
              value={numero}
              onChange={manejarcambio}
            />
            {error && <p className="menu-alamano__error">{error}</p>}

            <button type="button" className="menu-alamano__boton" onClick={manejarenvio}>
              Continuar
            </button>
          </section>
        </div>
      </div>
    </div>
  )
}

export default NumeroAlaMano
