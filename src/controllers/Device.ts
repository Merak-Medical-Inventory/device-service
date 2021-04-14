import { Request, Response , NextFunction } from 'express';
import {
    createDeviceSvc,
    findDeviceSvc,
    findAllDevicesSvc,
    updateDeviceSvc,
    deleteDeviceSvc, updateLocationDeviceSvc, findDevicesDepartmentSvc, findOrderDevicesSvc
} from '@services/device';
import { handleSuccess } from '@helpers/succesHandler';
import { ErrorHandler } from '@helpers/ErrorHandler/';
import logger from '@shared/Logger';

interface IRequest extends Request {
    [key: string]: any;
}

export const createDeviceCtrl = async (req : IRequest , res : Response , next: NextFunction) => {
    const Device = req.body;
    try{
        const data =  await createDeviceSvc(Device);
        handleSuccess(201, 'Equipo Médico Creado', res, next,data);
    }catch (e){
        next(new ErrorHandler(500, e.message));
    }
};

export const findDeviceCtrl = async (req: IRequest, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
        const data = await findDeviceSvc({id});
        handleSuccess(200, 'Información de el Equipo Médico', res, next, data);
    } catch (e) {
        console.error('ERROR: controller -> findDeviceCtrl', e);
        next(e);
    }
};

export const findAllDevicesCtrl = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
        const data = await findAllDevicesSvc();
        console.log(data);
        handleSuccess(200, 'Información de los Equipos Médicos', res, next, data);
    } catch (e) {
        console.error('ERROR: controller -> findAllDevicesCtrl', e);
        next(e);
    }
};

export const updateDeviceCtrl = async ( req: IRequest, res: Response, next: NextFunction) => {
    const update = req.body;
    const { id } = req.params;
    try {
        const data = await updateDeviceSvc(id, update);
        handleSuccess(
            201,
            'Equipo Médico Actualizado Satisfactoriamente',
            res,
            next,
            data
        );
    } catch (e) {
        logger.error('ERROR: controller -> updateDeviceCtrl', e);
        next(e);
    }
};

export const deleteDeviceCtrl = async (req: IRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const data = await deleteDeviceSvc(id);
        handleSuccess(
            201,
            'Equipo Médico Eliminado Satisfactoriamente',
            res,
            next,
            data
        );
    } catch (e) {
        logger.error('ERROR: controller -> deleteDeviceCtrl', e);
        next(e);
    }
};

export const updateLocationDeviceCtrl = async (
    req: IRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const idInventory = req.body.idInventory;
        const id = parseInt(req.params.id);
        const data = await updateLocationDeviceSvc(id, idInventory);
        handleSuccess(
            201,
            "Ubicación Actualizada para el Equipo Médico",
            res,
            next,
            data
        );
    } catch (e) {
        logger.error("ERROR: controller -> updateLocationDeviceCtrl", e);
        next(e);
    }
};

export const findDevicesDepartmentCtrl = async (req: IRequest, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
        const data = await findDevicesDepartmentSvc(Number(id));
        handleSuccess(200, 'Información de los Equipos Médicos', res, next, data);
    } catch (e) {
        console.error('ERROR: controller -> findDevicesDepartmentCtrl', e);
        next(e);
    }
};

export const findOrderDevicesCtrl = async (req: IRequest, res: Response, next: NextFunction) => {
    const order = req.body.asc;
    try {
        const data = await findOrderDevicesSvc(order);
        handleSuccess(200, 'Información de los Equipos Médicos', res, next, data);
    } catch (e) {
        console.error('ERROR: controller -> findOrderDevicesCtrl', e);
        next(e);
    }
};
