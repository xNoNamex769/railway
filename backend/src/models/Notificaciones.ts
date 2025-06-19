import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { Evento } from './Evento';
import { Usuario } from './Usuario'; // necesario para saber quién recibió la notificación

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

  //  NUEVO: para saber a quién va dirigida la notificación
  @ForeignKey(() => Usuario)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare IdUsuario: number;

  //  NUEVO: para saber si el aprendiz confirmó que va
  @Column({ type: DataType.BOOLEAN, allowNull: true, defaultValue: false })
  declare Confirmado: boolean;
}
