import Joi from '@hapi/joi';

export const createMaintenanceSchema = Joi.object().keys({
    description: Joi.string().required(),
    date: Joi.date().required(),
    device: Joi.number().required()
});
