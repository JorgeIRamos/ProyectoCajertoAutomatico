import './menu-principal.css'
import { useNavigate } from "react-router-dom";

function MenuPrincipal() {
  const navigate = useNavigate();

  return (
    <div className="menu-principal">
      <div className="menu-principal__marco">
        <div className="menu-principal__pantalla">
          <header className="menu-principal__encabezado">
            <h1 className="menu-principal__titulo">Cajero Automático</h1>
            <p className="menu-principal__subtitulo">
              Seleccione una de las opciones para retirar
            </p>
          </header>

          <nav className="menu-principal__opciones" aria-label="Opciones de retiro">
            <button
              type="button"
              className="menu-principal__boton"
              onClick={() => navigate("/nequi/numero")}
            >
              <span className="menu-principal__boton-texto">Nequi</span>
            </button>

            <button
              type="button"
              className="menu-principal__boton"
              onClick={() => navigate("/bancolombia/numero")}
            >
              <span className="menu-principal__boton-texto">Bancolombia</span>
            </button>

            <button
              type="button"
              className="menu-principal__boton"
              onClick={() => navigate("/alamano/numero")}
            >
              <span className="menu-principal__boton-texto">A la mano</span>
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default MenuPrincipal
