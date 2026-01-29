import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { Pedido } from './entidad/pedido.entity';
import { Mascota } from '../mascotas/entidad/mascota.entity'; // Importa la entidad

@Module({
  imports: [
    TypeOrmModule.forFeature([Pedido, Mascota]) // Agregamos Mascota aquí
  ],
  providers: [PedidosService],
  controllers: [PedidosController]
})
export class PedidosModule {}