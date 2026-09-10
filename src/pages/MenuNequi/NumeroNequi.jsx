import './menu-nequi.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { validarNequi, guardarNumero } from '../../controller/validacion'

function NumeroNequi() {
  const navigate = useNavigate();
  const [numero, setNumero] = useState("");
  const [error, setError] = useState("");

  const manejarcambio = (e) => {
    setNumero(e.target.value);
    setError("");
  }

  const manejarenvio = (e) => {
    if(!validarNequi(numero)) {
      setError("Número de teléfono inválido. Debe tener 10 dígitos y comenzar con '3'.");
      return;
    }
    guardarNumero(numero);
    navigate('/nequi/clave');
  }

  return (
    <div className="menu-nequi">
      <div className="menu-nequi__marco">
        <div className="menu-nequi__pantalla">
          <header className="menu-nequi__cabecera">
            <h1 className="menu-nequi__titulo">Retiros Nequi</h1>
          </header>

          <section className="menu-nequi__contenido">
            <input
              type="text"
              className="menu-nequi__input"
              placeholder="Digite su número de teléfono"
              maxLength={10}
              value={numero}
              onChange={manejarcambio}
            />
            {error && <p className="menu-nequi__error">{error}</p>}

            <button type="button" className="menu-nequi__boton" onClick={manejarenvio}>
              Continuar
            </button>
          </section>
        </div>
      </div>
    </div>
  )
}

export default NumeroNequi
