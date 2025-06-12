import { Link } from 'react-router-dom'
import './ProjectesLlista.css'

export default function ProjectesLlista({ projectes, handleEliminarProjecte }) {


  return (
    <div className="llista-projectes">
      {projectes.map((projecte, index) => (
        <div className="targeta" key={projecte.id}>
          <Link to={`/projecte/${projecte.id}`} className="enllac-projecte">
            <h2>{index + 1} - {projecte.descripcio}</h2>
          </Link>
          <button className="boto-eliminar" onClick={() => handleEliminarProjecte(projecte.id)}>
            Eliminar projecte
          </button>
        </div>
      ))}
    </div>
  )
}