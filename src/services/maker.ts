import {
    createMaker,
    findMaker,
    findAllMakers,
    updateMaker,
    deleteMaker
} from '@db/entity/Maker/MakerDao';
import logger from '@shared/Logger';

export const createMakerSvc = async (maker: any) => {
    try {
        return await createMaker(maker);
    } catch (e) {
        console.error('TCL: createMakerSvc -> e', e);
        throw e;
    }
};

export const findMakerSvc = async (maker: any) => {
    try {
        return await findMaker(maker);
    } catch (e) {
        console.error('TCL: findMakerSvc -> e', e);
        throw e;
    }
};

export const findAllMakersSvc = async () => {
    try {
        return await findAllMakers();
    } catch (e) {
        console.error('TCL: findAllMakersSvc -> e', e);
        throw e;
    }
};

export const updateMakerSvc = async (id: any, dataToUpdate: any = {}) => {
    try {
        return await updateMaker(id, dataToUpdate);
    } catch (e) {
        logger.error('TCL: updateMakerSvc -> e', e);
        throw e;
    }
};

export const deleteMakerSvc = async (id: any) => {
    try {
        return await deleteMaker(id);
    } catch (e) {
        logger.error('TCL: deleteMakerSvc -> e', e);
        throw e;
    }
};
