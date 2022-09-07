import { Column, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Plant } from './plant.model';

@Table({
  tableName: "users",
  timestamps: false
})
export class User extends Model {
  @PrimaryKey
  @Column
  id: number;
  
  @Column
  name: string;
  
  @HasMany(() => Plant)
  plants: Plant[]
}