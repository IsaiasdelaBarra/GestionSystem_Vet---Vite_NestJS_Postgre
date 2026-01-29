import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { JwtService } from '@nestjs/jwt';


@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('registro') // POST /usuarios/registro
  async registro(@Body() datos: any) {
    return this.usuariosService.registrarCliente(datos);
  }

  @Post('crear-vendedor') // POST /usuarios/crear-vendedor
  async nuevoVendedor(@Body() datos: any) {
    return this.usuariosService.crearVendedor(datos);
  }

  @Get('vendedores') // GET /usuarios/vendedores
  async obtenerVendedores() {
    return this.usuariosService.listarVendedores();
  }

  @Get('por-rol/:rol')
async obtenerUsuariosPorRol(@Param('rol') rol: string) {
  // Usamos "as" para decirle a TS: "Confía en mí, este string es uno de estos dos"
  const rolValidado = rol as 'cliente' | 'vendedor';
  return await this.usuariosService.buscarPorRol(rolValidado);
}

@Get('todos')
async obtenerTodos() {
  return await this.usuariosService.buscarTodos();
}

@Post('vendedor')
async crearVendedor(@Body() datos: any) {
  // Este es el endpoint que te da 404 cuando intentas registrar staff
  return await this.usuariosService.crearVendedor(datos);
}

@Post('login')
  async login(@Body() body: any) {
    const usuario = await this.usuariosService.validarLogin(body.email, body.password);
    
    // Creamos el Payload (la información que viajará dentro del token)
    const payload = { 
      id: usuario.id, 
      email: usuario.email, 
      rol: usuario.rol 
    };

    return {
      // Firmamos el token REAL
      token: this.jwtService.sign(payload),
      // Enviamos el usuario al frontend SIN la contraseña
      usuario: {
        id: usuario.id,
        email: usuario.email,
        rol: usuario.rol
      }
    };
  }
}