import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { Usuario } from './Usuario';

@Table({ tableName: 'SolicitudApoyo' })
export class SolicitudApoyo extends Model {

  @Column({ primaryKey: true, autoIncrement: true })
  declare IdSolicitud: number;

  @Column({ type: DataType.TEXT, allowNull: false})
  declare Descripcion: string;

  @Column({ type: DataType.STRING(100) })
  declare ContactoEmergencia: string;

  @Column({ type: DataType.ENUM("Psicologica", "Emocional", "Economica", "Otra"), allowNull: false })
  declare TipoAyuda: string;

  @Column({ type: DataType.ENUM("Pendiente", "En Proceso", "Atendido", "Finalizado")}) //si se agrega el default column marca error o bueno en mi pc
    declare Estado: string;

  @ForeignKey(() => Usuario)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare IdUsuario: number;
}
