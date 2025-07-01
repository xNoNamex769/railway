import { Table, Column, Model, DataType ,HasMany} from 'sequelize-typescript';
import { PlanificacionEvento } from './PlanificacionEvento';

@Table({ tableName: 'GestionEvento' })
export class GestionEvento extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  declare IdGestionE: number;

  @Column({ type: DataType.ENUM("Aprobado", "Pendiente"), allowNull: false })
  declare Aprobar: string;
  @HasMany(() => PlanificacionEvento)
declare planificaciones: PlanificacionEvento[];

}
