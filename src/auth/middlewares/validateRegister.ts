import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { registerSchema} from '../middlewares/schemas/registerSchema';

function createValidatorForRegister(schema: Joi.ObjectSchema<any>) {
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

const validatedRegister = createValidatorForRegister(registerSchema);

export { validatedRegister};
