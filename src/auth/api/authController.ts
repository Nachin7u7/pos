import { Request, Response, Router } from 'express';
import { successHandler } from '../handlers';
import { UserRepository } from '../repositories/implements/UserRepository';
import { AuthService } from '../services/authService';
import { authMiddleware } from '../middlewares/authMiddleware';
import { checkRoles } from '../middlewares/checkRoles';
import { loginDto } from '../../dtos/loginDto';
import { registerDto } from '../../dtos/registerDto';
import { validateBodySchema } from '../middlewares/bodyValidator';
import { registerSchema } from '../middlewares/schemas/registerSchema';
import { loginSchema } from '../middlewares/schemas/loginSchema';

export class AuthController {
    public router: Router;
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
        this.router = Router();
        this.routes();
    }

    public async register(req: Request, res: Response): Promise<Response> {
        const { username, password, email }: registerDto = req.body;
        try {
            const user = await this.authService.register(username, password, email);
            successHandler.sendCreatedResponse(res, 'User registered successfully', user);
        } catch (error) {
            if(error instanceof Error)
            return res.status(400).json({ 
                 message: error.message 
            });
        }
    }

    public async registerAdmin(req: Request, res: Response): Promise<Response> {
        const { username, password, email }: registerDto = req.body;
        try {
            const user = await this.authService.register(username, password, email, true);
            successHandler.sendCreatedResponse(res, 'A new ADMIN account has been created successfully.', user);
        } catch (error) {
            if(error instanceof Error)
            return res.status(400).json({ message: error.message });
        }
    }

    public async login(req: Request, res: Response): Promise<Response> {
        const { username, password }: loginDto = req.body;
        try {
            const token = await this.authService.login(username, password);
            if (token) {
                successHandler.sendOkResponse(res, { token }, 'Login successful');
            } else {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
        } catch (error) {
            if(error instanceof Error)
            return res.status(400).json({ message: error.message });
        }
    }


    public verifyToken(req: Request, res: Response){
        successHandler.sendOkResponse(res, null, 'Token is valid');
    }

    public verifyRoles(req: Request, res: Response){
        successHandler.sendOkResponse(res, null, 'It has all the roles required');
    }
    public routes() {
        this.router.post('/register', validateBodySchema(registerSchema),this.register.bind(this));
        this.router.post('/registerAdmin', validateBodySchema(registerSchema),this.registerAdmin.bind(this));
        this.router.post('/login', validateBodySchema(loginSchema),this.login.bind(this));
        this.router.get('/verifyToken', authMiddleware, this.verifyToken.bind(this));
        this.router.get('/checkRoles',authMiddleware,checkRoles([{id:1, name: "Cliente"}]),this.verifyRoles.bind(this))
    }
}

const authController = new AuthController(new AuthService(new UserRepository()));
export default authController.router;
    