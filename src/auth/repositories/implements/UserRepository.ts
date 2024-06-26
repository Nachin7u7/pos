import { Repository } from 'typeorm';
import { AppDataSource } from '../../../config/dataSource';
import { User } from '../../models/User';
import { IUser } from '../../entities/IUser';
import { IUserRepository } from '../IUserRepository';

export class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async findById(id: number): Promise<IUser | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findByUsername(username: string): Promise<IUser | null> {
    return this.repository.findOne({ where: { username } });
  }

  async save(user: IUser): Promise<IUser> {
    return this.repository.save(user);
  }
}

