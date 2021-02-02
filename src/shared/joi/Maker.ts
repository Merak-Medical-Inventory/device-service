import Joi from '@hapi/joi';

export const createMakerSchema = Joi.object().keys({
    name: Joi.string().required(),
    phone_number: Joi.string().required(),
    address: Joi.string().required()
});
