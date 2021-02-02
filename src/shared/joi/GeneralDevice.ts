import Joi from '@hapi/joi';

export const createGeneralDeviceSchema = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required()
});
