import { Table, Column, Model, ForeignKey, DataType } from 'sequelize-typescript'; 
import { Usuario } from './Usuario'; 
import { Evento } from './Evento';    

@Table({
  tableName: 'RelUsuarioEvento',
  timestamps: true,
})
export class RelUsuarioEvento extends Model<RelUsuarioEvento> {
  
  @ForeignKey(() => Usuario)
  @Column({ type: DataType.INTEGER, allowNull: false, primaryKey:true })
  declare IdUsuario: number;

  @ForeignKey(() => Evento)
  @Column({ type: DataType.INTEGER, allowNull: false, primaryKey:true })
  declare IdEvento: number;
}
