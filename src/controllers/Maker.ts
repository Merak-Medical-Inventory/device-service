import { Request, Response , NextFunction } from 'express';
import {
    createMakerSvc,
    findMakerSvc,
    findAllMakersSvc,
    updateMakerSvc,
    deleteMakerSvc
} from '@services/maker';
import { handleSuccess } from '@helpers/succesHandler';
import { ErrorHandler } from '@helpers/ErrorHandler/';
import logger from '@shared/Logger';

interface IRequest extends Request {
    [key: string]: any;
}

export const createMakerCtrl = async (req : IRequest , res : Response , next: NextFunction) => {
    const Maker = req.body;
    try{
        const data =  await createMakerSvc(Maker);
        handleSuccess(201, 'Fabricante Creado', res, next,data);
    }catch (e){
        next(new ErrorHandler(500, e.message));
    }
};

export const findMakerCtrl = async (req: IRequest, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
        const data = await findMakerSvc({id});
        handleSuccess(200, 'Información de el Fabricante', res, next, data);
    } catch (e) {
        console.error('ERROR: controller -> findMakerCtrl', e);
        next(e);
    }
};

export const findAllMakersCtrl = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
        const data = await findAllMakersSvc();
        handleSuccess(200, 'Información de los Fabricantes', res, next, data);
    } catch (e) {
        console.error('ERROR: controller -> findAllMakersCtrl', e);
        next(e);
    }
};

export const updateMakerCtrl = async ( req: IRequest, res: Response, next: NextFunction) => {
    const update = req.body;
    const { id } = req.params;
    try {
        const data = await updateMakerSvc(id, update);
        handleSuccess(
            201,
            'Fabricante actualizado satisfactoriamente',
            res,
            next,
            data
        );
    } catch (e) {
        logger.error('ERROR: controller -> updateMakerCtrl', e);
        next(e);
    }
};

export const deleteMakerCtrl = async (req: IRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const data = await deleteMakerSvc(id);
        handleSuccess(
            201,
            'Fabricante eliminado satisfactoriamente',
            res,
            next,
            data
        );
    } catch (e) {
        logger.error('ERROR: controller -> deleteMakerCtrl', e);
        next(e);
    }
};
