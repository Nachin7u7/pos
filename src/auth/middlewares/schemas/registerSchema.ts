import Joi from "joi";

const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(8).required(),
});

export {registerSchema};