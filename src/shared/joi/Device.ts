import Joi from '@hapi/joi';

export const createDeviceSchema = Joi.object().keys({
    serial_code: Joi.string().required(),
    power_supply: Joi.string(),
    date: Joi.date().required(),
    warranty_date: Joi.date().required(),
    production_year: Joi.number().required(),
    generalDevice: Joi.number().required(),
    maker: Joi.number().required(),
    brand : Joi.number().required(),
    location: Joi.number().required()
});

export const updateDeviceSchema = Joi.object().keys({
    serial_code: Joi.string().required(),
    power_supply: Joi.string(),
    date: Joi.date().required(),
    warranty_date: Joi.date().required(),
    production_year: Joi.number().required(),
    generalDevice: Joi.number().required(),
    maker: Joi.number().required(),
    brand : Joi.number().required()
});

export const updateLocationDevice = Joi.object().keys({
    idInventory: Joi.number().required
});

