// middlewares.ts
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { loginSchema } from '../middlewares/schemas/loginSchema';
import { registerSchema } from '../middlewares/schemas/registerSchema';

function createValidatorForSchema(schema: Joi.ObjectSchema<any>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error: any) {
      if (error.isJoi) {
        return res.status(400).json({ error: error.details });
      }
      return res.status(500).send();
    }
  };
}

const validateRegistration = createValidatorForSchema(registerSchema);
const validateLogin = createValidatorForSchema(loginSchema);

export { validateRegistration, validateLogin };