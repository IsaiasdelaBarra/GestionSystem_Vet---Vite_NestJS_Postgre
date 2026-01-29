import { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Registro = () => {
  const [datos, setDatos] = useState({
    email: '',
    password: '',
    rol: 'cliente' // Valor por defecto
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Enviamos los datos incluyendo el rol elegido
      await api.post('/usuarios/registro', datos);
      alert("Registro exitoso. Ahora inicia sesión.");
      navigate('/login');
    } catch (error) {
      alert("Error al registrar usuario");
    }
  };

  return (
    <div className="hero-container">
      <form className="card" onSubmit={handleSubmit} style={{ width: '400px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <h2>Crear Cuenta</h2>
        
        <input 
          type="email" 
          placeholder="Email" 
          onChange={e => setDatos({...datos, email: e.target.value})} 
          required 
        />
        
        <input 
          type="password" 
          placeholder="Contraseña" 
          onChange={e => setDatos({...datos, password: e.target.value})} 
          required 
        />

        {/* SELECTOR DE ROL (Crucial para que no seas siempre cliente) */}
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Tipo de cuenta:</label>
          <select 
            value={datos.rol} 
            onChange={e => setDatos({...datos, rol: e.target.value})}
            style={{ width: '100%', padding: '10px' }}
          >
            <option value="cliente">Cliente (Dueño de mascota)</option>
            <option value="vendedor">Vendedor (Staff de la tienda)</option>
          </select>
        </div>

        <button type="submit" className="btn-primary">Registrarse</button>
      </form>
    </div>
  );
};

export default Registro;