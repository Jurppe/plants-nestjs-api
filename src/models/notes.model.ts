import { Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Plant } from './plant.model';

@Table({
  tableName: "plants_notes",
  timestamps: false
})
export class Note extends Model {
  @PrimaryKey
  @Column
  id: number;
  
  @Column
  comment: string;
  
  @ForeignKey(() => Plant)
  @Column
  plant_id: string;
}