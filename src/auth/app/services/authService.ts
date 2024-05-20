import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { IUser } from '../../domain/entities/IUser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class AuthService {
  constructor(private userRepository: IUserRepository) {}

  async register(username: string, password: string): Promise<IUser> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: IUser = { id: 0, username, password: hashedPassword, roles: [] };
    return this.userRepository.save(newUser);
  }

  async login(username: string, password: string): Promise<string | null> {
    const user = await this.userRepository.findByUsername(username);
    if (user && await bcrypt.compare(password, user.password)) {
      return jwt.sign({ id: user.id, username: user.username, roles: user.roles }, 'your_jwt_secret', { expiresIn: '1h' });
    }
    return null;
  }
}
