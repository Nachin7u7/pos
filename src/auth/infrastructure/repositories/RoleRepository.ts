import { Repository } from 'typeorm';
import { AppDataSource } from '../../../config/dataSource';
import { Role } from '../../domain/models/Role';
import { IRole } from '../../domain/entities/IRole';
import { IRoleRepository } from '../../domain/repositories/IRoleRepository';

export class RoleRepository implements IRoleRepository {
  private repository: Repository<Role>;

  constructor() {
    this.repository = AppDataSource.getRepository(Role);
  }

  async findById(id: number): Promise<IRole | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findByName(name: string): Promise<IRole | null> {
    return this.repository.findOne({ where: { name } });
  }

  async save(role: IRole): Promise<IRole> {
    return this.repository.save(role);
  }
}
