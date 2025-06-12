import { Table, Column, Model, DataType, ForeignKey, HasMany, BelongsTo } from 'sequelize-typescript';
import { Evento } from './Evento';
import { Asistencia } from './Asistencia';

@Table({ 
  tableName: 'Actividad',
  timestamps: true 
})
export class Actividad extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  declare IdActividad: number;

  @Column({ type: DataType.STRING(150), allowNull: false })
  declare NombreActi: string;

  @Column({ type: DataType.DATE, allowNull: false })
  declare FechaInicio: Date;
  
  @Column({ type: DataType.DATE, allowNull: false })
  declare FechaFin: Date;

  @Column({ type: DataType.TIME, allowNull: false })
  declare HoraFin: string;

  @Column({ type: DataType.TIME, allowNull: false })
  declare HoraInicio: string;

  @Column({ type: DataType.STRING(50), allowNull: false })
  declare TipoLudica: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare Descripcion: string;

  @ForeignKey(() => Evento)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare IdEvento: number;

  @BelongsTo(() => Evento)
  declare evento: Evento;

  @HasMany(() => Asistencia)
  declare asistencias: Asistencia[];
}
