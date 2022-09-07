import { Column, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { User } from './user.model';

@Table({
  tableName: "plants",
  timestamps: false
})
export class Plant extends Model {
  @PrimaryKey
  @Column
  id: string;

  @Column
  picture: string;

  @Column
  name: string;

  @Column
  about: string;

  @Column
  bought: Date;

  @Column
  last_watered: Date;

  @Column
  watering_period: "daily" | "weekly" | "yearly";

  @ForeignKey(() => User)
  @Column
  owner_id: number;
}