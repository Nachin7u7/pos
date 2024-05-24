import { DataSource } from 'typeorm';
import { User } from '../auth/domain/models/User';
import { Role } from '../auth/domain/models/Role';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'mati110511',
  database: 'postgres',
  synchronize: true,
  logging: false,
  entities: [User, Role],
  migrations: [],
  subscribers: [],
});
