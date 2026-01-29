import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../../usuarios/entidad/usuario.entity';

@Entity('mascotas') // Nombre exacto de tu tabla en Postgres
export class Mascota {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  tipo: string; // 'perro' o 'gato'

  @Column('decimal', { precision: 5, scale: 2 })
  peso: number;

  @Column()
  edad: number;

  @Column({ name: 'esta_castrado', default: false })
  estaCastrado: boolean;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'id_dueno' })
  dueno: Usuario;
}