import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { Usuario } from './Usuario';
import { Actividad } from './Actividad';

@Table({ tableName: 'Asistencia' })
export class Asistencia extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  declare AsiId: number;

  @Column({ type: DataType.DATE, allowNull: false })
  declare AsiFecha: Date;

  @Column({ type: DataType.INTEGER, allowNull: true })
  declare AsiHorasAsistidas: number;

  @Column({ type: DataType.STRING(100), allowNull: false })
  declare QREntrada: string;

  @Column({ type: DataType.STRING(100), allowNull: false })
  declare QRSalida: string;

  @ForeignKey(() => Usuario)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare IdUsuario: number;

  @ForeignKey(() => Actividad)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare IdActividad: number;
}
