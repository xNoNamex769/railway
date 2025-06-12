import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'Feedback' })
export class Feedback extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  declare IdFeedback: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  declare ComentarioFeedback: string;

  @Column({ type: DataType.DATE, allowNull: true })
  declare FechaEnvio: Date;
}
