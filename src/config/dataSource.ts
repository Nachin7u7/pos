import { DataSource } from 'typeorm';
import { User } from '../auth/models/User';
import { Role } from '../auth/models/Role';
import config from './config';

const {db} = config;

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: db.host,
  port: parseInt(db.port, 10),
  username: db.user,
  password: db.password,
  database: db.dbName,
  synchronize: true,
  logging: false,
  entities: [User, Role],
  migrations: [],
  subscribers: [],
});
