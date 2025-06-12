import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { Usuario } from './Usuario';

@Table({ tableName: 'HistorialSolicitud' })
export class HistorialSolicitud extends Model {

  @Column({ primaryKey: true, autoIncrement: true })
  declare IdHistorial: number;

  @ForeignKey(() => Usuario)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare IdSolicitud: number;

  @Column({ type: DataType.ENUM('Pendiente', 'En Proceso', 'Atendido', 'Finalizado'), allowNull: false })
  declare EstadoNuevo: string;

  @Column({ type: DataType.TEXT})
  declare Comentario: string;
  
  @ForeignKey(() => Usuario)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare RolUsuario: number;
}