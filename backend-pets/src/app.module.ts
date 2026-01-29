import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsuariosModule } from './usuarios/usuarios.module';
import { MascotasModule } from './mascotas/mascotas.module';
import { PedidosModule } from './pedidos/pedidos.module';

@Module({
  imports: [
    // 1. Cargar el archivo .env
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // 2. Configurar TypeORM usando las variables del .env
    TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres', 
  password: '123',
  database: 'postgres',
  autoLoadEntities: true, // <--- Cambia esto
  synchronize: true, 
}),
    UsuariosModule,
    MascotasModule,
    PedidosModule,
  ],
})
export class AppModule {}