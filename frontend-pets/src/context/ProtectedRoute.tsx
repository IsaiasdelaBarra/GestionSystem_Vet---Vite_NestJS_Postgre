import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface Props {
  rolePermitido?: string;
}

const ProtectedRoute = ({ rolePermitido }: Props) => {
  const { token, usuario } = useContext(AuthContext);

  // 1. Si no hay token, lo mandamos al login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 2. Si hay un rol requerido y el usuario no lo tiene, lo mandamos al inicio
  if (rolePermitido && usuario?.rol !== rolePermitido) {
    return <Navigate to="/" replace />;
  }

  // 3. Si todo está bien, lo dejamos pasar a la ruta hija
  return <Outlet />;
};

export default ProtectedRoute;