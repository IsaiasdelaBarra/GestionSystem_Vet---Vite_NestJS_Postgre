import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('pedidos')
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_mascota: number;

  @Column()
  id_cliente: number;

  @Column('decimal', { precision: 10, scale: 2 })
  cantidad_alimento: number;

  @Column()
  cantidad_complementos: number;

  @Column({ default: 'recibido' })
  estado: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;
}