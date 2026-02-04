import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Usuario } from '../usuarios/entidad/usuario.entity';
import { Mascota } from '../mascotas/entidad/mascota.entity';
import { Pedido } from '../pedidos/entidad/pedido.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Usuario, Mascota, Pedido],
  // Usamos .ts para que la CLI de TypeORM pueda leerlos directamente con ts-node
  migrations: ['src/migrations/*.ts'], 
  synchronize: false, // Desactivamos esto para usar migraciones
  logging: true,
});