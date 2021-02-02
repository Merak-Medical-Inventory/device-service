import Joi from '@hapi/joi';

export const createMaintenanceSchema = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    date: Joi.date().required,
    id: Joi.number().required()
});
