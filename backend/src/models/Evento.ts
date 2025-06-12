import { Table, Column, Model, DataType, ForeignKey, HasMany } from 'sequelize-typescript';
import { PlanificacionEvento } from './PlanificacionEvento';
import { Actividad } from './Actividad';
import { Notificaciones } from './Notificaciones';
import { RelUsuarioEvento } from './RelUsuarioEvento';
@Table({ tableName: 'Evento', timestamps: true }) // Habilitar timestamps
export class Evento extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  declare IdEvento: number;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare NombreEvento: string;

  @Column({ type: DataType.DATEONLY, allowNull: false })
  declare FechaInicio: Date;

  @Column({ type: DataType.DATEONLY, allowNull: false })
  declare FechaFin: Date;

  @Column({ type: DataType.TIME, allowNull: false })
  declare HoraFin: string;

  @Column({ type: DataType.TIME, allowNull: false })
  declare HoraInicio: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare UbicacionEvento: string;

  @ForeignKey(() => PlanificacionEvento)
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare IdPlanificarE: number;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare DescripcionEvento: string;

  @HasMany(() => Actividad,{
    onUpdate:'CASCADE',
    onDelete:'CASCADE'
  })
  declare actividades: Actividad[];

  @HasMany(() => Notificaciones)
  declare notificaciones: Notificaciones[];

  @HasMany(() => RelUsuarioEvento)
  declare relUsuarioEventos: RelUsuarioEvento[];
}
