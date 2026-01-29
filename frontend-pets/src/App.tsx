import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Registro from './paginas/Registro';
import PanelCliente from './paginas/PanelCliente';
import PanelVendedor from './paginas/PanelVendedor';
import GestionVendedor from './paginas/GestionVendedor';
import Navbar from './componentes/Navbar';
import { AuthProvider } from './context/AuthContext';
import Inicio from './paginas/Inicio';
import ProtectedRoute from './context/ProtectedRoute'; // Importamos el Guard
import Login from './paginas/Login';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* --- RUTAS PÚBLICAS --- */}
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          {/* Podrías agregar aquí tu ruta de /login cuando la tengas */}

          {/* --- RUTAS DE CLIENTE (Protegidas) --- */}
          <Route element={<ProtectedRoute rolePermitido="cliente" />}>
            <Route path="/cliente" element={<PanelCliente />} />
          </Route>

          {/* --- RUTAS DE VENDEDOR (Protegidas) --- */}
          <Route element={<ProtectedRoute rolePermitido="vendedor" />}>
            <Route path="/vendedor" element={<PanelVendedor />} />
            <Route path="/vendedor/gestion" element={<GestionVendedor />} />
          </Route>

          {/* RUTA 404 o Redirección opcional */}
          <Route path="*" element={<Inicio />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;