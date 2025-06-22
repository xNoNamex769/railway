import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Usuario } from './Usuario';

@Table({ 
  tableName: 'AlquilerElementos',
  timestamps: true  
})
export class AlquilerElementos extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  declare IdAlquiler: number;

  @Column({ type: DataType.STRING(50), allowNull: false })
  declare NombreElemento: string;

  @Column({ type: DataType.DATE, allowNull: false })
  declare FechaSolicitud: Date;

  @Column({ type: DataType.DATE, allowNull: false })
  declare FechaDevolucion: Date;

  @Column({ type: DataType.STRING(50), allowNull: false })
  declare RegistradoPor: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare Observaciones: string;

  @ForeignKey(() => Usuario)
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare IdUsuario: number;

  @Column({ type: DataType.STRING, allowNull: true })
declare Imagen: string;

  @BelongsTo(() => Usuario)
  declare usuario: Usuario;  // Esta bloque linea como lo quieran llamar  zozorras es la que define la relación con Usuario
}
