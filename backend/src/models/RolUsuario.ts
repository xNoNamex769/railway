import { Table, Column, Model, DataType, ForeignKey,BelongsTo } from 'sequelize-typescript';
import { Usuario } from './Usuario';

@Table({ tableName: 'RolUsuario' })
export class RolUsuario extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  declare IdRol: number;

  @Column({ type: DataType.ENUM("Administrador", "Aprendiz", "Instructor"), allowNull: false })
  declare NombreRol: string;

  @ForeignKey(() => Usuario)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare IdUsuario: number;
  @BelongsTo(() => Usuario, { as: 'usuario' }) //  alias de vuelta
declare usuario: Usuario;
}
