# 🐾 Pet's Shop Manager

Este proyecto es un sistema de gestión para una tienda de mascotas, desarrollado con un backend en **NestJS** y un frontend en **React (Vite)**.

## 🛠️ Instalación de Librerías

Para que el proyecto funcione correctamente, debes instalar las siguientes dependencias en sus respectivas carpetas:

### 1. Backend (Carpeta `backend-pets`)
Abre una terminal en la carpeta del backend y ejecuta:
```bash
# Instalación de dependencias base
npm install

# Librerías específicas utilizadas para seguridad y base de datos:
npm install @nestjs/typeorm typeorm pg bcrypt @nestjs/jwt passport-jwt
npm install -D @types/bcrypt @types/passport-jwt
2. Frontend (Carpeta frontend-pets)
Abre una terminal en la carpeta del frontend y ejecuta:

Bash
# Instalación de dependencias base
npm install

# Librerías específicas utilizadas para la interfaz y conexión:
npm install axios react-router-dom
🏃‍♂️ Cómo Iniciar el Proyecto
Es necesario tener dos terminales abiertas simultáneamente, una para cada parte del sistema:

Paso 1: Iniciar el Backend
Desde la carpeta backend-pets, ejecuta:

Bash
npm run start:dev
El servidor correrá por defecto en http://localhost:3000.

Paso 2: Iniciar el Frontend
Desde la carpeta frontend-pets, ejecuta:

Bash
npm run dev
La aplicación se abrirá en http://localhost:5173 (o la URL que indique la consola).

⚙️ Configuración Previa
Asegúrate de tener PostgreSQL instalado y funcionando.

Verifica que la base de datos coincida con la configuración en el archivo app.module.ts del backend.


---


.env (Example):

### 3. Variables de Entorno
Crea un archivo llamado `.env` en la raíz de la carpeta `backend-pets` basándote en el archivo `.env.example`:

```bash
# Copiar el ejemplo para crear el archivo real
cp .env.example .env

---

### 2. Contenido del archivo `.env.example`
Crea un archivo nuevo llamado `.env.example` dentro de tu carpeta **`backend-pets`** con este contenido:

```env
# CONFIGURACIÓN DE LA BASE DE DATOS (PostgreSQL)
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=tu_usuario_postgres
DB_PASSWORD=tu_contrasena_segura
DB_NAME=nombre_de_tu_base_de_datos

# CONFIGURACIÓN DE SEGURIDAD (JWT)
# Cambia esta clave por una frase larga y secreta en producción
JWT_SECRET=tu_clave_secreta_super_segura_123
JWT_EXPIRES_IN=1h