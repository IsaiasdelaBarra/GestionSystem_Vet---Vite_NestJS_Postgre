import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Mascota } from '../../mascotas/entidad/mascota.entity';

@Entity('usuarios') // Nombre de tu tabla en Postgres
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'varchar',
    default: 'cliente',
  })
  rol: 'cliente' | 'vendedor';

  @OneToMany(() => Mascota, (mascota) => mascota.dueno)
  mascotas: Mascota[];
}