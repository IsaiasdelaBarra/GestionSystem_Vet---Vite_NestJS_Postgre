import { Controller, Post, Get, Body, Patch, Param } from '@nestjs/common';
import { PedidosService } from './pedidos.service';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  // Punto 2.c: Realizar pedidos de combos
  @Post()
  async crearPedido(@Body() body: { id_mascota: number; id_cliente: number }) {
    return this.pedidosService.crearPedido(body.id_mascota, body.id_cliente);
  }

  // Punto 3.a: Ver todos los pedidos (Para Vendedores)
  @Get()
  async verTodos() {
    return this.pedidosService.obtenerTodos();
  }

  // Punto 2.d: Ver histórico de un cliente específico
  @Get('cliente/:id')
  async verHistorial(@Param('id') id: number) {
    return this.pedidosService.obtenerPorCliente(id);
  }

  // Punto 3.b: Marcar como despachado
  @Patch(':id/despachar')
  async despachar(@Param('id') id: number) {
    return this.pedidosService.despacharPedido(id);
  }


  @Get('cliente/:id')
  async obtenerPorCliente(@Param('id') id: number) {
  return await this.pedidosService.obtenerPorCliente(id);
  }
}