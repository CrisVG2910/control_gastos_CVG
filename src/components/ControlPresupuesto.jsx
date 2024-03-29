import { useState, useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({gastos, setGastos, presupuesto, setPresupuesto, setIsValidPresupuesto}) => {

  const [porcentaje, setPorcentaje] = useState(0)
  const [disponible, setDisponible] = useState(0)
  const [gastado, setGastado] = useState(0)
  
  useEffect(() => {
    const totalGastado = gastos.reduce( ( total, gasto ) => gasto.cantidad + total, 0) 

    const totalDisponible = presupuesto - totalGastado

    // Calcular el porcentaje gastado
    const nuevoPorcentaje = (( (presupuesto - totalDisponible ) / presupuesto ) * 100).toFixed(2)

    setGastado(totalGastado)
    setDisponible(totalDisponible)
    setPorcentaje(nuevoPorcentaje)
    
  }, [gastos])

    const formatearCantidad = (cantidad) => {
        return Number(cantidad).toLocaleString('es-CL', {
            style: 'currency',
            currency: 'CLP'
        })
    }

    const handleResetApp = () => {
      const resultado = confirm('¿Confirmar reinicar el presupuesto y los gastos?')

      if(resultado) {
        setGastos([])
        setPresupuesto((0))
        setIsValidPresupuesto(false)
      } 

    }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          value={porcentaje}
          styles={buildStyles({
            pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
            textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
            pathTransitionDuration: 2
          })}
          text={`${porcentaje}% Gastado`}
        />
      </div>

        <div className="contenido-presupuesto">
            <button 
              className='reset-app'
              type='button'
              onClick={handleResetApp}
            >
              Borrar Gastos
            </button>
            <p>
                <span>Presupuesto: </span>{formatearCantidad(presupuesto)}
            </p>
            <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                <span>Disponible: </span>{formatearCantidad(disponible)}
            </p>
            <p>
                <span>Gastado: </span>{formatearCantidad(gastado)}
            </p>
        </div>
    </div>
  )
}

export default ControlPresupuesto
