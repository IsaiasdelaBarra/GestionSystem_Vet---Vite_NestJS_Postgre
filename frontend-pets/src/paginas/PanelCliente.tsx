import { useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';

const PanelCliente = () => {
  // 1. Extraemos el usuario logueado del contexto
  const { usuario } = useContext(AuthContext);
  
  const [mascota, setMascota] = useState({
    nombre: '',
    tipo: 'perro',
    peso: 0,
    edad: 0,
    esta_castrado: false,
    id_dueno: usuario.id // Usamos el ID del usuario del contexto
  });

  const [misPedidos, setMisPedidos] = useState<any[]>([]);

  // 2. Cada vez que el usuario cambie en el selector del Navbar, actualizamos el formulario
  useEffect(() => {
    setMascota(prev => ({ ...prev, id_dueno: usuario.id }));
    cargarHistorial();
  }, [usuario]);

  const cargarHistorial = async () => {
    try {
      // Usamos usuario.id para filtrar los pedidos en la API
      const res = await api.get(`/pedidos/cliente/${usuario.id}`);
      setMisPedidos(res.data);
    } catch (error) {
      console.error("Error cargando historial", error);
    }
  };

  const registrarYPedir = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 1. Registro Mascota
      const resMascota = await api.post('/mascotas', mascota);
      
      // 2. Pedido Combo
      await api.post('/pedidos', {
        id_mascota: resMascota.data.id,
        id_cliente: usuario.id // Usamos el ID dinámico
      });

      alert("¡Mascota registrada y combo calculado!");
      cargarHistorial(); 
    } catch (error) {
      alert('Error en el proceso');
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <header style={{ marginBottom: '30px' }}>
        <h1>Panel de Cliente</h1>
        <p>Bienvenido, <strong>{usuario.email}</strong>. Gestiona los pedidos de tus mascotas.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px', alignItems: 'start' }}>
        
        <div className="card">
          <h2 style={{ marginTop: 0 }}>🐾 Nueva Mascota</h2>
          <form onSubmit={registrarYPedir} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nombre</label>
              <input placeholder="Ej: Firulais" required onChange={e => setMascota({...mascota, nombre: e.target.value})} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Especie</label>
              <select onChange={e => setMascota({...mascota, tipo: e.target.value})}>
                <option value="perro">Perro</option>
                <option value="gato">Gato</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Peso (kg)</label>
                <input type="number" step="0.1" placeholder="0.0" required onChange={e => setMascota({...mascota, peso: Number(e.target.value)})} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Edad</label>
                <input type="number" placeholder="Años" required onChange={e => setMascota({...mascota, edad: Number(e.target.value)})} />
              </div>
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '10px 0' }}>
              <input type="checkbox" style={{ width: 'auto' }} onChange={e => setMascota({...mascota, esta_castrado: e.target.checked})} /> 
              <span>¿Está castrado/a?</span>
            </label>

            <button type="submit" style={{ backgroundColor: '#4CAF50' }}>
              Guardar y Calcular Combo
            </button>
          </form>
        </div>

        <div className="card">
          <h2 style={{ marginTop: 0 }}>📋 Mis Pedidos Recientes</h2>
          {misPedidos.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>No hay pedidos para este usuario.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Mascota (ID)</th>
                  <th>Alimento</th>
                  <th>Complementos</th>
                  <th style={{ textAlign: 'center' }}>Estado</th>
                </tr>
              </thead>
              <tbody>
                {misPedidos.map((p) => (
                  <tr key={p.id}>
                    <td style={{ fontWeight: 'bold' }}>#{p.id_mascota}</td>
                    <td>{Number(p.cantidad_alimento).toFixed(2)} kg</td>
                    <td>{p.cantidad_complementos} unidades</td>
                    <td style={{ textAlign: 'center' }}>
                      <span style={{
                        padding: '5px 12px',
                        borderRadius: '15px',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        backgroundColor: p.estado === 'despachado' ? '#d4edda' : '#e3f2fd',
                        color: p.estado === 'despachado' ? '#155724' : '#0d47a1',
                        border: `1px solid ${p.estado === 'despachado' ? '#c3e6cb' : '#bbdefb'}`
                      }}>
                        {p.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default PanelCliente;