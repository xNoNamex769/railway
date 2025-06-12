import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { Evento } from './Evento';

@Table({
  tableName: 'Notificaciones',
  timestamps: true, 
})
export class Notificaciones extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  declare IdNotificacion: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  declare Mensaje: string;

  @Column({ type: DataType.ENUM("Evento", "Actividad", "Anuncio"), allowNull: false })
  declare TiposNotificacion: string;

  @Column({ type: DataType.DATEONLY, allowNull: false })
  declare FechaDeEnvio: Date;

  @ForeignKey(() => Evento)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare IdEvento: number;
}
