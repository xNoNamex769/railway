import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Evento } from './Evento';
import { Usuario } from './Usuario';

@Table({ tableName: 'Feedback' })
export class Feedback extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  declare IdFeedback: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  declare ComentarioFeedback: string;

  @Column({ type: DataType.DATE, allowNull: true })
  declare FechaEnvio: Date;

 
  @ForeignKey(() => Evento)
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare IdEvento: number;

  @BelongsTo(() => Evento)
  declare evento: Evento;


  @ForeignKey(() => Usuario)
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare IdUsuario: number;

  @BelongsTo(() => Usuario)
  declare usuario: Usuario;
}
