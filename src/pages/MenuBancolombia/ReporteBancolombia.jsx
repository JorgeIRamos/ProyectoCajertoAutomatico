// components/ReporteBancolombia/ReporteBancolombia.jsx
import { useNavigate } from 'react-router-dom'
import './menu-bancolombia.css'
import { obtenerNumero, limpiarNumero, obtenerMonto, limpiarMonto } from '../../controller/validacion'
import { calcularDesgloseAcarreo, DENOMINACIONES } from '../../controller/acarreo'
import { inventario } from '../../controller/inventario'
import { predecirTransacciones } from '../../controller/prediccion'

function ReporteBancolombia() {
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

  // Billetes que quedan por denominación después de este retiro
  const billetesRestantes = DENOMINACIONES.map((d, i) => {
    const disponibleAntes = inventario[d] ?? 0
    return disponibleAntes - resultado.conteo[i]
  })

  // Cuántos retiros iguales a este se pueden seguir haciendo con el inventario actual
  const inventarioDespuesDeEsteRetiro = {}
    DENOMINACIONES.forEach((d, i) => {
      inventarioDespuesDeEsteRetiro[d] = billetesRestantes[i]
    })

  const prediccion = predecirTransacciones(monto, inventarioDespuesDeEsteRetiro)

  return (
    <div className="menu-alamano">
      <div className="menu-alamano__marco">
        <div className="menu-alamano__pantalla">

          <header className="menu-alamano__cabecera menu-alamano__cabecera--reporte">
            <h1 className="menu-alamano__titulo menu-alamano__titulo--reporte">
              Reporte de transacción
            </h1>
          </header>

          <section className="menu-alamano__reporte" aria-label="Reporte del retiro">

            <div className="menu-alamano__reporte-fila">
              <span className="menu-alamano__reporte-etiqueta">Número de retiro</span>
              <p>{numero}</p>
            </div>

            <div className="menu-alamano__reporte-fila">
              <span className="menu-alamano__reporte-etiqueta">Monto retirado</span>
              <p>{monto}</p>
            </div>

            <div className="menu-alamano__reporte-billetes">
              <h2 className="menu-alamano__reporte-subtitulo">Billetes entregados</h2>
              <ul className="menu-alamano__reporte-lista">
                {resultado.conteo.map((cantidad, i) =>
                  cantidad > 0 ? (
                    <li key={DENOMINACIONES[i]} className="menu-alamano__reporte-item">
                      <p>{cantidad} x {DENOMINACIONES[i]}</p>
                    </li>
                  ) : null
                )}
              </ul>
            </div>

            <div className="menu-alamano__reporte-billetes">
              <h2 className="menu-alamano__reporte-subtitulo">Billetes restantes en el cajero</h2>
              <ul className="menu-alamano__reporte-lista">
                {DENOMINACIONES.map((d, i) => (
                  <li key={d} className="menu-alamano__reporte-item">
                    <p>{billetesRestantes[i]} x {d}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="menu-alamano__reporte-fila">
              <span className="menu-alamano__reporte-etiqueta">
                Retiros posibles con el inventario actual
              </span>
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

export default ReporteBancolombia