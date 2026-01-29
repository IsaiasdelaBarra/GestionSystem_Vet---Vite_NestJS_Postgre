import { useEffect, useState } from 'react';
import api from '../api/axios';

interface Pedido {
  id: number;
  id_mascota: number;
  id_cliente: number;
  cantidad_alimento: number;
  cantidad_complementos: number;
  estado: string;
}

const PanelVendedor = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  const cargarPedidos = async () => {
    try {
      const res = await api.get('/pedidos');
      setPedidos(res.data);
    } catch (error) {
      console.error("Error al cargar pedidos", error);
    }
  };

  useEffect(() => {
    cargarPedidos();
  }, []);

  const despacharPedido = async (id: number) => {
    try {
      await api.patch(`/pedidos/${id}/despachar`);
      alert(`Pedido #${id} despachado con éxito`);
      cargarPedidos(); // Recargar la lista
    } catch (error) {
      alert("No se pudo despachar el pedido");
    }
  };

  return (
    <div style={{ padding: '100px' }}>
      <h2>Panel de Gestión de Pedidos (Vendedor)</h2>
      <table border={1} style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th>ID Pedido</th>
            <th>ID Mascota</th>
            <th>Alimento (kg)</th>
            <th>Complementos</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.id_mascota}</td>
              <td>{Number(p.cantidad_alimento).toFixed(2)} kg</td>
              <td>{p.cantidad_complementos}</td>
              <td style={{ color: p.estado === 'despachado' ? 'green' : 'orange' }}>
                {p.estado.toUpperCase()}
              </td>
              <td>
                {p.estado !== 'despachado' && (
                  <button onClick={() => despacharPedido(p.id)}>
                    Marcar como Despachado
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PanelVendedor;