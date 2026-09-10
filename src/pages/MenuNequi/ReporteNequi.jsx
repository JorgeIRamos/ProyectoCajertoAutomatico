// components/ReporteNequi/ReporteNequi.jsx
import { useNavigate } from 'react-router-dom'
import './menu-nequi.css'
import { obtenerNumero, limpiarNumero, obtenerMonto, limpiarMonto } from '../../controller/validacion'
import { calcularDesgloseAcarreo, DENOMINACIONES } from '../../controller/acarreo'
import { inventario } from '../../controller/inventario'
import { predecirTransacciones } from '../../controller/prediccion'

function ReporteNequi() {
  const navigate = useNavigate()

  const numero = obtenerNumero()
  const monto = Number(obtenerMonto())

  const resultado = calcularDesgloseAcarreo(monto)

  const reporteNumero = '0' + numero

  const finalizar = () => {
    limpiarNumero()
    limpiarMonto()
    navigate('/')
  }

  if (resultado.error) {
    return <p>{resultado.mensaje}</p>
  }

  // Billetes que quedan por denominación después de este retiro
  const billetesRestantes = DENOMINACIONES.map((d, i) => {
    const disponibleAntes = inventario[d] ?? 0 // ← sin dividir entre 1000
    return disponibleAntes - resultado.conteo[i]
  })

  // Cuántos retiros iguales a este se pueden seguir haciendo con el inventario actual
  // Convierte el array billetesRestantes a un objeto { denominacion: cantidad }
  const inventarioDespuesDeEsteRetiro = {}
    DENOMINACIONES.forEach((d, i) => {
      inventarioDespuesDeEsteRetiro[d] = billetesRestantes[i]
    })

  const prediccion = predecirTransacciones(monto, inventarioDespuesDeEsteRetiro)


  return (
    <div className="menu-nequi">
      <div className="menu-nequi__marco">
        <div className="menu-nequi__pantalla">

          <header className="menu-nequi__cabecera menu-nequi__cabecera--reporte">
            <h1 className="menu-nequi__titulo menu-nequi__titulo--reporte">
              Reporte de transacción
            </h1>
          </header>

          <section className="menu-nequi__reporte" aria-label="Reporte del retiro">

            <div className="menu-nequi__reporte-fila">
              <span className="menu-nequi__reporte-etiqueta">Número de retiro</span>
              <p>{reporteNumero}</p>
            </div>

            <div className="menu-nequi__reporte-fila">
              <span className="menu-nequi__reporte-etiqueta">Monto retirado</span>
              <p>{monto}</p>
            </div>

            <div className="menu-nequi__reporte-billetes">
              <h2 className="menu-nequi__reporte-subtitulo">Billetes entregados</h2>
              <ul className="menu-nequi__reporte-lista">
                {resultado.conteo.map((cantidad, i) =>
                  cantidad > 0 ? (
                    <li key={DENOMINACIONES[i]} className="menu-nequi__reporte-item">
                      <p>{cantidad} x {DENOMINACIONES[i]}</p>
                    </li>
                  ) : null
                )}
              </ul>
            </div>

            <div className="menu-nequi__reporte-billetes">
              <h2 className="menu-nequi__reporte-subtitulo">Billetes restantes en el cajero</h2>
              <ul className="menu-nequi__reporte-lista">
                {DENOMINACIONES.map((d, i) => (
                  <li key={d} className="menu-nequi__reporte-item">
                    <p>{billetesRestantes[i]} x {d}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="menu-nequi__reporte-fila">
              <span className="menu-nequi__reporte-etiqueta">
                Retiros posibles con el inventario actual
              </span>
              <p>{prediccion.transaccionesPosibles}</p>
            </div>

          </section>

          <div className="menu-nequi__acciones">
            <button
              type="button"
              className="menu-nequi__boton menu-nequi__boton--confirmar"
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

export default ReporteNequi