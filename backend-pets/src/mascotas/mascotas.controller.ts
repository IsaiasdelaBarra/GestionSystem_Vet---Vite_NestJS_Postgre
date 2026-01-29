import { Controller, Post, Get, Body } from '@nestjs/common';
import { MascotasService } from './mascotas.service';

@Controller('mascotas')
export class MascotasController {
  constructor(private readonly mascotasService: MascotasService) {}

  @Post()
  async registrarMascota(@Body() body: any) {
    return this.mascotasService.crear(body);
  }

  @Get()
  async verTodas() {
    return this.mascotasService.obtenerTodasConDuenos();
  }
  @Get('con-duenos')
async obtenerMascotasConDuenos() {
  return await this.mascotasService.listarConDuenos();
}
}