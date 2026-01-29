import { createContext, useState, type ReactNode, useEffect } from 'react';

// Definimos la interfaz para tener autocompletado y evitar el "any"
interface AuthContextType {
  usuario: any;
  token: string | null;
  login: (datosUsuario: any, token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Estado para el usuario
  const [usuario, setUsuario] = useState<any>(() => {
    const sesionGuardada = localStorage.getItem('petshop_usuario');
    return sesionGuardada ? JSON.parse(sesionGuardada) : null;
  });

  // Estado para el token JWT
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('petshop_jwt');
  });

  // Función para iniciar sesión con datos reales y JWT
  const login = (userData: any, token: string) => {
  // 1. Creamos una copia del usuario SIN la contraseña
  // Usamos desestructuración para separar 'password' del resto
  const { password, ...usuarioSeguro } = userData;

  // 2. Guardamos solo el token y los datos seguros
  setUsuario(usuarioSeguro);
  setToken(token);

  localStorage.setItem('petshop_jwt', token);
  // Guardamos usuarioSeguro, así el "123" desaparece del LocalStorage
  localStorage.setItem('petshop_usuario', JSON.stringify(usuarioSeguro));
  
  // Si usas petshop_sesion, bórralo o guárdalo sin password también
  localStorage.setItem('petshop_sesion', JSON.stringify(usuarioSeguro)); 
};

  // Función para cerrar sesión y limpiar todo
  const logout = () => {
    setUsuario(null);
    setToken(null);
    localStorage.removeItem('petshop_usuario');
    localStorage.removeItem('petshop_jwt');
    // Opcional: limpiar todo el storage si no usas nada más
    // localStorage.clear(); 
  };

  return (
    <AuthContext.Provider value={{ usuario, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};