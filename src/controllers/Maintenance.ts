import { Request, Response , NextFunction } from 'express';
import {
    createMaintenanceSvc,
    findMaintenanceSvc,
    findAllMaintenancesSvc,
    updateMaintenanceSvc,
    deleteMaintenanceSvc, findAllMaintenancesDepartmentSvc
} from '@services/maintenance';
import { handleSuccess } from '@helpers/succesHandler';
import { ErrorHandler } from '@helpers/ErrorHandler/';
import logger from '@shared/Logger';

interface IRequest extends Request {
    [key: string]: any;
}

export const createMaintenanceCtrl = async (req : IRequest , res : Response , next: NextFunction) => {
    const Maintenance = req.body;
    console.log(Maintenance);
    try{
        const data =  await createMaintenanceSvc(Maintenance);
        handleSuccess(201, 'Mantenimiento Creado', res, next,data);
    }catch (e){
        next(new ErrorHandler(500, e.message));
    }
};

export const findMaintenanceCtrl = async (req: IRequest, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
        const data = await findMaintenanceSvc({id});
        handleSuccess(200, 'Información de el Mantenimiento', res, next, data);
    } catch (e) {
        console.error('ERROR: controller -> findMaintenanceCtrl', e);
        next(e);
    }
};

export const findAllMaintenancesCtrl = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
        const data = await findAllMaintenancesSvc();
        handleSuccess(200, 'Información de los Mantenimientos', res, next, data);
    } catch (e) {
        console.error('ERROR: controller -> findAllMaintenancesCtrl', e);
        next(e);
    }
};

export const findAllMaintenancesDepartmentCtrl = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const data = await findAllMaintenancesDepartmentSvc(Number(id));
        handleSuccess(200, 'Información de los Mantenimientos', res, next, data);
    } catch (e) {
        console.error('ERROR: controller -> findAllMaintenancesDepartmentCtrl', e);
        next(e);
    }
};

export const updateMaintenanceCtrl = async ( req: IRequest, res: Response, next: NextFunction) => {
    const update = req.body;
    const { id } = req.params;
    try {
        const data = await updateMaintenanceSvc(id, update);
        handleSuccess(
            201,
            'Mantenimiento actualizado satisfactoriamente',
            res,
            next,
            data
        );
    } catch (e) {
        logger.error('ERROR: controller -> updateMaintenanceCtrl', e);
        next(e);
    }
};

export const deleteMaintenanceCtrl = async (req: IRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const data = await deleteMaintenanceSvc(id);
        handleSuccess(
            201,
            'Mantenimiento eliminado satisfactoriamente',
            res,
            next,
            data
        );
    } catch (e) {
        logger.error('ERROR: controller -> deleteMaintenanceCtrl', e);
        next(e);
    }
};
