import { useContext } from 'react'; // Importante añadir useContext
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Importante añadir el Contexto
import '../App.css';

const Inicio = () => {
  // Extraemos usuario y logout para controlar qué botones mostrar
  const { usuario, logout } = useContext(AuthContext);

  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1 className="hero-title">
          Pet's Shop <br /> 
          <span style={{color: '#ffcc00'}}>Manager</span>
        </h1>

        <p className="hero-description">
          Calcula automáticamente el alimento ideal para tu mascota, 
          registra su historial y gestiona pedidos de forma profesional.
        </p>
        
        <div className="hero-buttons-container">
          {!usuario ? (
            /* --- MOSTRAR SI NO HAY NADIE LOGUEADO --- */
            <>
              <div className="hero-main-actions">
                <Link to="/registro" className="btn-primary">Registrarse</Link>
               
              </div>
              
              <div className="hero-divider">O</div>
              
              <Link to="/login" className="btn-login-inicio">Iniciar Sesión</Link>
            </>
          ) : (
            /* --- MOSTRAR SI YA HAY UNA SESIÓN ACTIVA --- */
            <div className="hero-main-actions">
              <Link 
                to={usuario.rol === 'vendedor' ? "/vendedor" : "/cliente"} 
                className="btn-primary"
              >
                Ir a mi Panel ({usuario.rol})
              </Link>
              
              <button onClick={logout} className="btn-secondary">
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inicio;