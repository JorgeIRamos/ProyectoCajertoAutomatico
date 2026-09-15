import './menu-bancolombia.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { validarCuentaAhorros, guardarNumero } from '../../controller/validacion'

function NumeroBancolombia() {
  const navigate = useNavigate();
  const [numero, setNumero] = useState("");
  const [error, setError] = useState("");

  const manejarcambio = (e) => {
    const soloNumeros = e.target.value.replace(/\D/g, "");
    setNumero(soloNumeros);
    setError("");
  }

  const manejarenvio = (e) => {
    if(!validarCuentaAhorros(numero)) {
      setError("El número de cuenta debe tener exactamente 11 dígitos, sin letras ni símbolos.");
      return;
    }
    guardarNumero(numero);
    navigate('/bancolombia/clave');
  }

  return (
    <div className="menu-bancolombia">
      <div className="menu-bancolombia__marco">
        <div className="menu-bancolombia__pantalla">
          <header className="menu-bancolombia__cabecera">
            <h1 className="menu-bancolombia__titulo">Retiros Cuenta de ahorros</h1>
          </header>

          <section className="menu-bancolombia__contenido">
            <input
              type="text"
              className="menu-bancolombia__input"
              placeholder="Digite su número de cuenta"
              maxLength={11}
              value={numero}
              onChange={manejarcambio}
            />
            {error && <p className="menu-bancolombia__error">{error}</p>}

            <button type="button" className="menu-bancolombia__boton" onClick={manejarenvio}>
              Continuar
            </button>
            <button type="button" className="menu-bancolombia__boton" onClick={() => navigate('/')}>
              Cancelar
            </button>
          </section>
        </div>
      </div>
    </div>
  )
}

export default NumeroBancolombia
