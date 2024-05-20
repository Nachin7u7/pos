import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { IUser } from '../entities/IUser';
import { IRole } from '../entities/IRole';
import { Role } from './Role';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @ManyToMany(() => Role)
  @JoinTable()
  roles: IRole[];
}