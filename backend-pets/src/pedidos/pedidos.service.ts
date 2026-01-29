import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './entidad/pedido.entity';
import { Mascota } from '../mascotas/entidad/mascota.entity';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidosRepo: Repository<Pedido>,
    
    @InjectRepository(Mascota)
    private readonly mascotasRepo: Repository<Mascota>,
  ) {}

  async crearPedido(idMascota: number, idCliente: number) {
    const mascota = await this.mascotasRepo.findOne({ where: { id: idMascota } });
    if (!mascota) throw new NotFoundException('Mascota no encontrada');

    const { alimento, complementos } = this.calcularLogicaCombo(mascota);

    const nuevoPedido = this.pedidosRepo.create({
      id_mascota: mascota.id,
      id_cliente: idCliente,
      cantidad_alimento: alimento,
      cantidad_complementos: complementos,
      estado: 'recibido'
    });

    return await this.pedidosRepo.save(nuevoPedido);
  }

  // --- LÓGICA DE CÁLCULO ACTUALIZADA ---
  private calcularLogicaCombo(mascota: Mascota) {
    let alimento = 0;
    let complementos = 0;

    if (mascota.tipo.toLowerCase() === 'gato') {
      alimento = mascota.peso * 0.5;
      if (mascota.edad > 5) complementos += 1;
      // Corregido: usamos esta_castrado como en la DB
      if (mascota.estaCastrado) complementos += 1;
    } 
    
    else if (mascota.tipo.toLowerCase() === 'perro') {
      alimento = mascota.peso * 0.8;
      complementos += Math.floor(mascota.edad / 3);
      // Corregido: usamos esta_castrado como en la DB
      if (mascota.estaCastrado && mascota.edad > 5) complementos += 1;
    }

    return { alimento, complementos };
  }

  async despacharPedido(idPedido: number) {
    const pedido = await this.pedidosRepo.findOne({ where: { id: idPedido } });
    if (!pedido) throw new NotFoundException('Pedido no encontrado');
    
    pedido.estado = 'despachado';
    return await this.pedidosRepo.save(pedido);
  }

  // Punto 3.a: Ver todos los pedidos
  async obtenerTodos() {
    return await this.pedidosRepo.find();
  }

  // Punto 2.d: Ver histórico de un cliente
  async obtenerPorCliente(id_cliente: number) {
    return await this.pedidosRepo.find({ where: { id_cliente } });
  }
}