import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entidad/usuario.entity';
import * as bcrypt from 'bcrypt'; // Importamos la librería

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepo: Repository<Usuario>,
  ) {}

  async registrarCliente(datos: any) {
    const existe = await this.usuariosRepo.findOne({ where: { email: datos.email } });
    if (existe) throw new ConflictException('El email ya está registrado');

    // ARTICULACIÓN DEL HASH:
    const salt = await bcrypt.genSalt(10); // Genera una "semilla" de seguridad
    const passwordHasheada = await bcrypt.hash(datos.password, salt); // Encripta

    const nuevoUsuario = this.usuariosRepo.create({
      ...datos,
      password: passwordHasheada, // Guardamos la versión ilegible
      rol: (datos.rol as 'cliente' | 'vendedor') || 'cliente', 
    });
    return await this.usuariosRepo.save(nuevoUsuario);
  }

  async validarLogin(email: string, pass: string) {
    const usuario = await this.usuariosRepo.findOne({ where: { email: email } });
    
    if (usuario) {
      // ARTICULACIÓN DE LA COMPARACIÓN:
      // Comparamos el texto plano del login con el hash de la DB
      const esValida = await bcrypt.compare(pass, usuario.password);
      
      if (esValida) {
        return usuario; // Si coinciden, devolvemos el usuario
      }
    }
    
    throw new UnauthorizedException('Credenciales incorrectas');
  }

  
  // MÉTODO QUE TE FALTABA
async buscarPorRol(rol: 'cliente' | 'vendedor') {
  return await this.usuariosRepo.find({
    where: { rol: rol } // Ahora TypeScript sabe que 'rol' es válido
  });
}

  async crearVendedor(datos: any) {
    const nuevoVendedor = this.usuariosRepo.create({
      ...datos,
      rol: 'vendedor' 
    });
    return await this.usuariosRepo.save(nuevoVendedor);
  }

  async listarVendedores() {
    return await this.usuariosRepo.find({ where: { rol: 'vendedor' } });
  }

  async buscarTodos() {
    return await this.usuariosRepo.find();
  }
}