import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import '../App.css'; 

const Navbar = () => {
  const { usuario, login, logout } = useContext(AuthContext);
  const [listaUsuarios, setListaUsuarios] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const res = await api.get('/usuarios/todos');
        // FILTRAR: Solo cargamos vendedores en la lista del simulador
        const soloVendedores = res.data.filter((u: any) => u.rol === 'vendedor');
        setListaUsuarios(soloVendedores);
      } catch (error) {
        console.error("Error al cargar usuarios", error);
      }
    };
    cargarUsuarios();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSwitch = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const idSeleccionado = Number(e.target.value);
    const u = listaUsuarios.find(user => user.id === idSeleccionado);
    if (u) {
      login(u, "token-simulado-123");
      window.location.reload();
    }
  };

  if (!usuario) return null; 

  return (
    <nav className="navbar-custom">
      <Link to="/" className="nav-logo">
        <img src="/Icono.gif" alt="Logo" style={{ height: '80px', width: 'auto' }} />
        PET<span>SHOP</span>
      </Link>
      
      <div className="nav-links-container">
        <Link to="/" className="nav-link">Home</Link>
        
        {usuario.rol === 'cliente' && <Link to="/cliente" className="nav-link">Panel Cliente</Link>}
        
        {usuario.rol === 'vendedor' && (
          <>
            <Link to="/vendedor" className="nav-link">Pedidos</Link>
            <Link to="/vendedor/gestion" className="nav-link">Gestión Staff</Link>
          </>
        )}

        <div className="simulador-wrapper">
          <span className="simulador-label">USUARIO:</span>
          
          {/* LÓGICA CONDICIONAL: Select solo para vendedores, texto para clientes */}
          {usuario.rol === 'vendedor' ? (
            <select value={usuario.id} onChange={handleSwitch} className="simulador-select">
              <option value={usuario.id}>{usuario.email} (Yo)</option>
              {listaUsuarios
                .filter(u => u.id !== usuario.id)
                .map(u => (
                  <option key={u.id} value={u.id}>{u.email}</option>
                ))}
            </select>
          ) : (
            <span className="user-display-name">{usuario.email}</span>
          )}

          <button onClick={handleLogout} className="btn-logout">Salir 🚪</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;