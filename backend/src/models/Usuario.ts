import { Table, Column, Model, DataType, HasMany, Default ,AllowNull} from 'sequelize-typescript';
import { RolUsuario } from './RolUsuario';
import { AlquilerElementos } from './AlquilerElementos';
import { Asistencia } from './Asistencia';
import { Constancia } from './Constancia';
import { ConsultaIA } from './ConsultaIA';
import { RelUsuarioEvento } from './RelUsuarioEvento';
import { RelUsuarioFeedback } from './RelUsuarioFeedback';

@Table({ tableName: 'Usuario' })
export class Usuario extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  declare IdUsuario: number;

@AllowNull(false)
  @Column({ type: DataType.STRING(50) }) 
  declare IdentificacionUsuario: string;

@AllowNull(false)
  @Column({ type: DataType.STRING(100)})
  declare Nombre: string;

@AllowNull(false)
  @Column({ type: DataType.STRING(100) })
  declare Apellido: string;

@AllowNull(false)
  @Column({ type: DataType.STRING(255)}) 
  declare Correo: string;

@AllowNull(false)
  @Column({ type: DataType.STRING(20)})
  declare Telefono: string;

@AllowNull(false)
  @Column({ type: DataType.STRING(255) })
  declare Contrasena: string;

@AllowNull(false)
  @Column({ type: DataType.DATEONLY })
  declare FechaRegistro: Date;

  @Column({ type: DataType. STRING(6),allowNull:true})
  declare token: string | null;

@Default(false)
  @Column({ type: DataType.BOOLEAN
})
  declare confirmed: boolean;

  @HasMany(() => RolUsuario)
  declare rolUsuarios: RolUsuario[];

  @HasMany(() => AlquilerElementos)
  declare alquilerElementos: AlquilerElementos[];

  @HasMany(() => Asistencia)
  declare asistencias: Asistencia[];

  @HasMany(() => Constancia)
  declare constancias: Constancia[];

  @HasMany(() => ConsultaIA)
  declare consultasIA: ConsultaIA[];

  @HasMany(() => RelUsuarioEvento)
  declare relUsuarioEventos: RelUsuarioEvento[];

  @HasMany(() => RelUsuarioFeedback)
  declare relUsuarioFeedbacks: RelUsuarioFeedback[];
}
