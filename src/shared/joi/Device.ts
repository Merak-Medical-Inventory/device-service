import Joi from '@hapi/joi';

export const createDeviceSchema = Joi.object().keys({
    serial_code: Joi.string().required(),
    power_supply: Joi.string(),
    date: Joi.date(),
    warranty_date: Joi.date(),
    production_year: Joi.number(),
    generalDevice: Joi.number(),
    brand : Joi.number().required(),
    location: Joi.number().required()
});

export const updateDeviceSchema = Joi.object().keys({
    serial_code: Joi.string().required(),
    power_supply: Joi.string(),
    date: Joi.date(),
    warranty_date: Joi.date(),
    production_year: Joi.number(),
    generalDevice: Joi.number(),
    brand : Joi.number().required()
});

export const updateLocationDevice = Joi.object().keys({
    id: Joi.number().required(),
    idInventory: Joi.number().required
});

