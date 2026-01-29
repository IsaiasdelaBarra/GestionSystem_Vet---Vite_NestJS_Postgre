import { useEffect, useState } from 'react';
import api from '../api/axios';

const GestionVendedor = () => {
  const [vendedores, setVendedores] = useState([]);
  const [mascotas, setMascotas] = useState([]);
  const [nuevoVendedor, setNuevoVendedor] = useState({ email: '', password: '' });

  const cargarDatos = async () => {
    try {
      const resV = await api.get('/usuarios/por-rol/vendedor');
      const resM = await api.get('/mascotas/con-duenos'); // Necesitarás crear este endpoint
      setVendedores(resV.data);
      setMascotas(resM.data);
    } catch (error) { console.error(error); }
  };

  useEffect(() => { cargarDatos(); }, []);

  const registrarVendedor = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/usuarios/vendedor', nuevoVendedor);
      alert("Nuevo vendedor creado");
      setNuevoVendedor({ email: '', password: '' });
      cargarDatos();
    } catch (error) { alert("Error al crear vendedor"); }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1>Administración del Sistema</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* 3.e Crear otros usuarios vendedores */}
        <div className="card">
          <h2>➕ Registrar Nuevo Staff</h2>
          <form onSubmit={registrarVendedor} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input 
              type="email" placeholder="Email del nuevo vendedor" 
              value={nuevoVendedor.email}
              onChange={e => setNuevoVendedor({...nuevoVendedor, email: e.target.value})} 
              required 
            />
            <input 
              type="password" placeholder="Contraseña temporal" 
              value={nuevoVendedor.password}
              onChange={e => setNuevoVendedor({...nuevoVendedor, password: e.target.value})} 
              required 
            />
            <button type="submit" style={{ backgroundColor: '#2c3e50' }}>Crear Vendedor</button>
          </form>
        </div>

        {/* 3.c Ver listado de vendedores */}
        <div className="card">
          <h2>🛡️ Staff Activo</h2>
          <table>
            <thead>
              <tr><th>ID</th><th>Email</th></tr>
            </thead>
            <tbody>
              {vendedores.map((v: any) => (
                <tr key={v.id}><td>{v.id}</td><td>{v.email}</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 3.d Ver listado de mascotas y dueños */}
        <div className="card" style={{ gridColumn: 'span 2' }}>
          <h2>🐶 Censo de Mascotas y Clientes</h2>
          <table>
            <thead>
              <tr>
                <th>Mascota</th>
                <th>Especie</th>
                <th>Dueño (Email)</th>
              </tr>
            </thead>
            <tbody>
              {mascotas.map((m: any) => (
                <tr key={m.id}>
                  <td><strong>{m.nombre}</strong></td>
      <td>{m.tipo}</td>
      <td>{m.dueno ? m.dueno.email : 'Sin dueño asignado'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default GestionVendedor;