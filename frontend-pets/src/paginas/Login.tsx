import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios'; // Asegúrate de que la ruta a tu instancia de axios sea correcta

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Añadimos estado para la contraseña
  const { usuario, login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirección automática si ya hay una sesión activa
  useEffect(() => {
    if (usuario) {
      navigate(usuario.rol === 'vendedor' ? '/vendedor' : '/cliente');
    }
  }, [usuario, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // 1. Petición real al backend
      const res = await api.post('/usuarios/login', { email, password });
      
      // 2. Extraemos el usuario y el token que devuelve tu API
      // Nota: Ajusta 'res.data.usuario' según la estructura de tu respuesta JSON
      const { usuario: usuarioDb, token } = res.data;
      
      // 3. Guardamos en el contexto (esto activará los Guards y la Navbar)
      login(usuarioDb, token);
      
      // 4. Redirección basada en el rol real de la base de datos
      if (usuarioDb.rol === 'vendedor') {
        navigate('/vendedor');
      } else {
        navigate('/cliente');
      }

    } catch (error: any) {
      console.error("Error en el login:", error);
      alert(error.response?.data?.mensaje || "Credenciales incorrectas");
    }
  };

  return (
    <div className="hero-container">
      <form className="card" onSubmit={handleLogin} style={{width: '400px', display: 'flex', flexDirection: 'column', gap: '15px', position: 'relative'}}>
        <Link to="/" className="btn-back" style={{position: 'absolute', top: '10px', left: '10px', textDecoration: 'none', fontSize: '0.8rem', color: '#666'}}>
          ← Volver
        </Link>
        
        <h2 style={{color: '#054f7d', marginTop: '20px'}}>Ingreso al Sistema</h2>
        
        <input 
          type="email" 
          placeholder="Correo electrónico" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
        
        <input 
          type="password" 
          placeholder="Contraseña" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
        
        <button type="submit" className="btn-primary">Entrar</button>
      </form>
    </div>
  );
};

export default Login;