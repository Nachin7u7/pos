import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { IUser } from '../../domain/entities/IUser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Roles } from '../../constants/roles';
import { buildLogger } from '../../../plugin/logger.pluggin';
import { generateToken } from '../../../util/jwt.util';

export class AuthService {
  private logger;

  constructor(private userRepository: IUserRepository) {
    this.logger = buildLogger('AuthService');
  }

  async register(username: string, password: string, isAdmin: boolean = false): Promise<IUser|null> {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const roles = isAdmin ? [Roles.ADMIN] : [Roles.NORMAL];
      const newUser: IUser = { id: 0, username, password: hashedPassword, roles };
      const savedUser = await this.userRepository.save(newUser);
      if (savedUser) {
        this.logger.log('User registered successfully', { userId: savedUser.id, username });
      return savedUser;}else{
        this.logger.error('Error saving user', { username });
        return null;
      }
    } catch (error: any) {
      this.logger.error('Error registering user', { username, error: error.message });
      throw error;
    }
  }

  async login(username: string, password: string): Promise<string | null> {
    try {
      const user = await this.userRepository.findByUsername(username);
      if (user && await bcrypt.compare(password, user.password)) {
        const token = generateToken(user);
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
