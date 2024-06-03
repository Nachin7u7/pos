import { IUserRepository } from '../repositories/IUserRepository';
import { IUser } from '../entities/IUser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Roles } from '../constants/roles';
import { buildLogger } from '../../plugin/logger.pluggin';

export class AuthService {
  private logger;

  constructor(private userRepository: IUserRepository) {
    this.logger = buildLogger('AuthService');
  }

  async register(username: string, password: string, email:string ,isAdmin: boolean = false): Promise<IUser> {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const roles = isAdmin ? [Roles.ADMIN] : [Roles.NORMAL];
      const newUser: IUser = { username, password: hashedPassword, email, roles };
      const savedUser = await this.userRepository.save(newUser);
      this.logger.log('User registered successfully', { userId: savedUser.id, username });
      return savedUser;
    } catch (error: any) {
      this.logger.error('Error registering user', { username, error: error.message });
      throw error;
    }
  }

  async login(username: string, password: string): Promise<string | null> {
    try {
      const user = await this.userRepository.findByUsername(username);
      if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user.id, username: user.username, roles: user.roles || [] }, 'SUPERDUPERTOKEN', { expiresIn: '1h' });
        this.logger.log('User logged in successfully', { username, userId: user.id });
        return token;
      } else {
        this.logger.log('Login failed: Invalid username or password', { username });
        return null;
      }
    } catch (error: any) {
      this.logger.error('Error during login', { username, error: error.message });
      throw error;
    }
  }
}
