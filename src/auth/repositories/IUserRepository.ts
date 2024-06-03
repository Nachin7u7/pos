import { IUser } from '../entities/IUser';

export interface IUserRepository {
  findById(id: number): Promise<IUser | null>;
  findByUsername(username: string): Promise<IUser | null>;
  save(user: IUser): Promise<IUser>;
}
