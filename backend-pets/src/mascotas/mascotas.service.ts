import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mascota } from './entidad/mascota.entity';

@Injectable()
export class MascotasService {
  constructor(
    @InjectRepository(Mascota)
    private readonly mascotaRepo: Repository<Mascota>,
  ) {}

  // Punto 2.b: Registrar mascotas
  async crear(datos: any) {
    const nuevaMascota = this.mascotaRepo.create(datos);
    return await this.mascotaRepo.save(nuevaMascota);
  }

  // Punto 3.d: Listado para vendedores
  async obtenerTodasConDuenos() {
    return await this.mascotaRepo.find({
      relations: ['id_dueno'], // Trae los datos del dueño asociados
    });
  }

  async listarConDuenos() {
  // Asegúrate de que en la Entidad Mascota, la relación se llame 'usuario' o 'dueno'
  return await this.mascotaRepo.find({ relations: ['dueno'] }); 
}

async listarMascotasConDuenos() {
  // Asumiendo que usas TypeORM con relaciones
  return await this.mascotaRepo.find({ relations: ['dueno'] });
}
}