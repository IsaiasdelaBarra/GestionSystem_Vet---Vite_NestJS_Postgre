-- 1. Tabla de Usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(50) NOT NULL CHECK (rol IN ('cliente', 'vendedor'))
);

-- 2. Tabla de Mascotas
CREATE TABLE mascotas (
    id SERIAL PRIMARY KEY,
    id_dueno INTEGER REFERENCES usuarios(id),
    nombre VARCHAR(100) NOT NULL,
    tipo VARCHAR(10) CHECK (tipo IN ('perro', 'gato')),
    peso DECIMAL(5,2) NOT NULL,
    edad INTEGER NOT NULL,
    esta_castrado BOOLEAN DEFAULT FALSE
);

-- 3. Tabla de Pedidos
CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    id_mascota INTEGER REFERENCES mascotas(id),
    id_cliente INTEGER REFERENCES usuarios(id),
    cantidad_alimento DECIMAL(10,2),
    cantidad_complementos INTEGER,
    estado VARCHAR(20) DEFAULT 'recibido' CHECK (estado IN ('recibido', 'despachado')),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);