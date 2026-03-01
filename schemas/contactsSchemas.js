import Joi from "joi";

export const createContactSchema = Joi.object({
    "name": Joi.string().required().messages({
        "string.base": `"name" should be a type of 'text'`,
        "string.empty": `"name" cannot be an empty field`,
        "any.required": `"name" is a required field`
    }),
    "email": Joi.string().email().required().messages({
        "string.base": `"email" should be a type of 'text'`,
        "string.empty": `"email" cannot be an empty field`,
        "string.email": `"email" must be a valid email`,
        "any.required": `"email" is a required field`
    }),
    "phone": Joi.string().required().messages({
        "string.base": `"phone" should be a type of 'text'`,
        "string.empty": `"phone" cannot be an empty field`,
        "any.required": `"phone" is a required field`
    })
})

export const updateContactSchema = Joi.object({
    "name": Joi.string().messages({
        "string.base": `"name" should be a type of 'text'`,
        "string.empty": `"name" cannot be an empty field`,
    }),
    "email": Joi.string().email().messages({
        "string.base": `"email" should be a type of 'text'`,
        "string.empty": `"email" cannot be an empty field`,
        "string.email": `"email" must be a valid email`,
    }),
    "phone": Joi.string().messages({
        "string.base": `"phone" should be a type of 'text'`,
        "string.empty": `"phone" cannot be an empty field`,
    }),
    "favorite": Joi.boolean().messages({
        "boolean.base": `"favorite" should be a type of 'boolean'`,
    })
})