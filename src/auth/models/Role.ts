import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IRole } from '../entities/IRole';

@Entity()
export class Role implements IRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
