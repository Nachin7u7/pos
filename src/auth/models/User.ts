import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, Unique } from 'typeorm';
import { IUser } from '../entities/IUser';
import { IRole } from '../entities/IRole';
import { Role } from './Role';

@Entity()
@Unique(['username','email'])
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Role)
  @JoinTable()
  roles: IRole[];
}