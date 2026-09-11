import { useNavigate } from 'react-router-dom'
import './menu-alamano.css'
import { obtenerNumero, limpiarNumero, obtenerMonto, limpiarMonto } from '../../controller/validacion'
import { calcularDesgloseAcarreo, DENOMINACIONES } from '../../controller/acarreo'
import { inventario } from '../../controller/inventario'
import { predecirTransacciones } from '../../controller/prediccion'

function ReporteAlaMano() {
  const navigate = useNavigate()

  const numero = obtenerNumero()
  const monto = Number(obtenerMonto())

  const resultado = calcularDesgloseAcarreo(monto)


  const finalizar = () => {
    limpiarNumero()
    limpiarMonto()
    navigate('/')
  }

  if (resultado.error) {
    return <p>{resultado.mensaje}</p>
  }

  const billetesRestantes = DENOMINACIONES.map((d, i) => {
    const disponibleAntes = inventario[d] ?? 0 
    return disponibleAntes - resultado.conteo[i]
  })

  const inventarioDespuesDeEsteRetiro = {}
    DENOMINACIONES.forEach((d, i) => {
      inventarioDespuesDeEsteRetiro[d] = billetesRestantes[i]
    })

  const prediccion = predecirTransacciones(monto, inventarioDespuesDeEsteRetiro)
  return (
    <div className="menu-bancolombia">
      <div className="menu-bancolombia__marco">
        <div className="menu-bancolombia__pantalla">

          <header className="menu-bancolombia__cabecera menu-bancolombia__cabecera--reporte">
            <h1 className="menu-bancolombia__titulo menu-bancolombia__titulo--reporte">
              Reporte de transacción
            </h1>
          </header>

          <section className="menu-bancolombia__reporte" aria-label="Reporte del retiro">

            <div className="menu-bancolombia__reporte-fila">
              <h2 className="menu-bancolombia__reporte-etiqueta">Número de retiro</h2>
              <p>{numero}</p>
            </div>

            <div className="menu-bancolombia__reporte-fila">
              <h2 className="menu-bancolombia__reporte-etiqueta">Monto retirado</h2>
              <p>{monto}</p>
            </div>

            <div className="menu-bancolombia__reporte-billetes">
              <h2 className="menu-bancolombia__reporte-subtitulo">Billetes entregados</h2>
              <ul className="menu-bancolombia__reporte-lista">
                {resultado.conteo.map((cantidad, i) =>
                  cantidad > 0 ? (
                    <li key={DENOMINACIONES[i]} className="menu-bancolombia__reporte-item">
                      <p>{cantidad} x {DENOMINACIONES[i]}</p>
                    </li>
                  ) : null
                )}
              </ul>
            </div>

            <div className="menu-bancolombia__reporte-billetes">
              <h2 className="menu-bancolombia__reporte-subtitulo">Billetes restantes en el cajero</h2>
              <ul className="menu-bancolombia__reporte-lista">
                {DENOMINACIONES.map((d, i) => (
                  <li key={d} className="menu-bancolombia__reporte-item">
                    <p>{billetesRestantes[i]} x {d}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="menu-bancolombia__reporte-fila">
              <h2 className="menu-bancolombia__reporte-etiqueta">
                Retiros posibles con el inventario actual
              </h2>
              <p>{prediccion.transaccionesPosibles}</p>
            </div>

          </section>

          <div className="menu-alamano__acciones">
            <button
              type="button"
              className="menu-alamano__boton menu-alamano__boton--confirmar"
              onClick={finalizar}
            >
              Finalizar
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ReporteAlaMano