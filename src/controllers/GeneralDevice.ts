import { Request, Response , NextFunction } from 'express';
import {
    createGeneralDeviceSvc,
    findGeneralDeviceSvc,
    findAllGeneralDevicesSvc,
    updateGeneralDeviceSvc,
    deleteGeneralDeviceSvc
} from '@services/generalDevice';
import { handleSuccess } from '@helpers/succesHandler';
import { ErrorHandler } from '@helpers/ErrorHandler/';
import logger from '@shared/Logger';

interface IRequest extends Request {
    [key: string]: any;
}

export const createGeneralDeviceCtrl = async (req : IRequest , res : Response , next: NextFunction) => {
    const generalDevice = req.body;
    try{
        const data =  await createGeneralDeviceSvc(generalDevice);
        handleSuccess(201, 'Equipo General Creado', res, next,data);
    }catch (e){
        next(new ErrorHandler(500, e.message));
    }
};

export const findGeneralDeviceCtrl = async (req: IRequest, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
        const data = await findGeneralDeviceSvc({id});
        handleSuccess(200, 'Información de el Equipo General', res, next, data);
    } catch (e) {
        console.error('ERROR: controller -> findGeneralDeviceCtrl', e);
        next(e);
    }
};

export const findAllGeneralDevicesCtrl = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
        const data = await findAllGeneralDevicesSvc();
        handleSuccess(200, 'Información de los Equipos Generales', res, next, data);
    } catch (e) {
        console.error('ERROR: controller -> findAllGeneralDevicesCtrl', e);
        next(e);
    }
};

export const updateGeneralDeviceCtrl = async ( req: IRequest, res: Response, next: NextFunction) => {
    const update = req.body;
    const { id } = req.params;
    try {
        const data = await updateGeneralDeviceSvc(id, update);
        handleSuccess(
            201,
            'Equipo General actualizado satisfactoriamente',
            res,
            next,
            data
        );
    } catch (e) {
        logger.error('ERROR: controller -> updateGeneralDeviceCtrl', e);
        next(e);
    }
};

export const deleteGeneralDeviceCtrl = async (req: IRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const data = await deleteGeneralDeviceSvc(id);
        handleSuccess(
            201,
            'Equipo General eliminado satisfactoriamente',
            res,
            next,
            data
        );
    } catch (e) {
        logger.error('ERROR: controller -> deleteGeneralDeviceCtrl', e);
        next(e);
    }
};
