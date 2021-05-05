import { Request, Response , NextFunction } from 'express';
import { handleSuccess } from '@helpers/succesHandler';
import {findAllDeviceTransactionSvc, findInventoryDeviceTransactionSvc} from '@services/deviceTransaction';
import logger from '@shared/Logger';
import { getBcDeviceTransactionSvc } from '@helpers/deviceTransaction';

interface IRequest extends Request {
    [key: string]: any;
}

export const findAllDeviceTransactionCtrl = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
        const data = await findAllDeviceTransactionSvc();
        handleSuccess(200, 'Información de las transacciones', res, next, data);
    } catch (e) {
        logger.error('ERROR: controller -> findAllDeviceTransactionCtrl', e);
        next(e);
    }
};

export const findBcDeviceTransactionCtrl = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params
        const data = await getBcDeviceTransactionSvc(id);
        handleSuccess(200, 'Información de las transacciones', res, next, data.data);
    } catch (e) {
        logger.error('ERROR: controller -> findAllTransactionCtrl', e);
        next(e);
    }
};

export const findInventoryDeviceTransactionCtrl = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const data = await findInventoryDeviceTransactionSvc(Number(id));
        handleSuccess(200, 'Información de las transacciones', res, next, data);
    } catch (e) {
        logger.error('ERROR: controller -> findAllDeviceTransactionCtrl', e);
        next(e);
    }
};
