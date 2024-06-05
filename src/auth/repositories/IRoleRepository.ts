import { IRole } from '../entities/IRole';

export interface IRoleRepository {
  findById(id: number): Promise<IRole | null>;
  findByName(name: string): Promise<IRole | null>;
  save(role: IRole): Promise<IRole>;
}
