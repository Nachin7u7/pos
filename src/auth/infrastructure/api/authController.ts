import { Request, Response, Router } from 'express';
import { UserRepository } from '../repositories/UserRepository';
import { AuthService } from '../../app/services/authService';

export class AuthController {
    public router: Router;
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
        this.router = Router();
        this.routes();
    }

    public async register(req: Request, res: Response): Promise<Response> {
        const { username, password } = req.body;
        try {
            const user = await this.authService.register(username, password);
            return res.status(201).json(user);
        } catch (error) {
            if(error instanceof Error)
            return res.status(400).json({ message: error.message });
        }
    }

    public async login(req: Request, res: Response): Promise<Response> {
        const { username, password } = req.body;
        try {
            const token = await this.authService.login(username, password);
            if (token) {
                return res.status(200).json({ token });
            } else {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
        } catch (error) {
            if(error instanceof Error)
            return res.status(400).json({ message: error.message });
        }
    }

    public routes() {
        this.router.post('/register', this.register.bind(this));
        this.router.post('/login', this.login.bind(this));
    }
}

const authController = new AuthController(new AuthService(new UserRepository()));
export default authController.router;
