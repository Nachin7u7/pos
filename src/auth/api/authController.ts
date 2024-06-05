import { Request, Response, Router } from 'express';
import { UserRepository } from '../repositories/implements/UserRepository';
import { AuthService } from '../services/authService';
import { authMiddleware } from '../middlewares/authMiddleware';
import { checkRoles } from '../middlewares/checkRoles';
import { loginSchema } from '../middlewares/schemas/loginSchema';
import { registerSchema } from '../middlewares/schemas/registerSchema';

export class AuthController {
    public router: Router;
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
        this.router = Router();
        this.routes();
    }

    public async register(req: Request, res: Response): Promise<Response> {
        const { username, password, email } = req.body;
        try {
            await registerSchema.validateAsync(req.body); // Validación con Joi
            const user = await this.authService.register(username, password, email);
            return res.status(201).json(user);
        } catch (error) {
            if(error instanceof Error)
            return res.status(400).json({ message: error.message });
        }
    }

    public async registerAdmin(req: Request, res: Response): Promise<Response> {
        const { username, password, email } = req.body;
        try {
            await registerSchema.validateAsync(req.body); // Validación con Joi
            const user = await this.authService.register(username, password, email, true);
            return res.status(201).json(user);
        } catch (error) {
            if(error instanceof Error)
            return res.status(400).json({ message: error.message });
        }
    }

    public async login(req: Request, res: Response): Promise<Response> {
        const { username, password } = req.body;
        try {
            await loginSchema.validateAsync(req.body); // Validación con Joi
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


    public verifyToken(req: Request, res: Response){
        return res.status(200).json({
            message: 'token valido'
        });
    }

    public verifyRoles(req: Request, res: Response){
        return res.status(200).json({
            message: "It has all the roles required"
        })
    }

    public routes() {
        this.router.post('/register', this.register.bind(this));
        this.router.post('/registerAdmin', this.registerAdmin.bind(this));
        this.router.post('/login', this.login.bind(this));
        this.router.get('/verifyToken', authMiddleware, this.verifyToken.bind(this)); //Ruta creada para demostrar el funcionamiento del middleware, que será removida en futuros avances
        // This route has been created for the only porpouse of verify the correctness for the checkRoles middleware
        this.router.get('/checkRoles',authMiddleware,checkRoles([{id:1, name: "Cliente"}]),this.verifyRoles.bind(this))
    }
}

const authController = new AuthController(new AuthService(new UserRepository()));
export default authController.router;
