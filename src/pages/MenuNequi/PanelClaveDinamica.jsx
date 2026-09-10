
function PanelClaveDinamica({clave, tiempoRestante}) {

    return (
        <div className="menu-nequi">
      <div className="menu-nequi__clave-dinamica">
        <span className="menu-nequi__clave-etiqueta">Clave dinámica</span>
        <span className="menu-nequi__clave-valor">{clave}</span>
        <span className="menu-nequi__clave-tiempo">Tiempo restante: {tiempoRestante} segundos</span>
      </div>
      </div>
    );
}

export default PanelClaveDinamica;