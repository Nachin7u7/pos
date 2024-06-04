import Joi from "joi";

const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.string().email().required(),
// se puede añadir mas cosas relacioandas a un registro en esta parte
});

export {registerSchema};