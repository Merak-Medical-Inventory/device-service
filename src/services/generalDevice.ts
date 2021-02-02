import {
    createGeneralDevice,
    findGeneralDevice,
    findAllGeneralDevices,
    updateGeneralDevice,
    deleteGeneralDevice
} from '@db/entity/GeneralDevice/GeneralDeviceDao';
import logger from '@shared/Logger';

export const createGeneralDeviceSvc = async (generalDevice: any) => {
    try {
        return await createGeneralDevice(generalDevice);
    } catch (e) {
        console.error('TCL: createGeneralDeviceSvc -> e', e);
        throw e;
    }
};

export const findGeneralDeviceSvc = async (generalDevice: any) => {
    try {
        return await findGeneralDevice(generalDevice);
    } catch (e) {
        console.error('TCL: findGeneralDeviceSvc -> e', e);
        throw e;
    }
};

export const findAllGeneralDevicesSvc = async () => {
    try {
        return await findAllGeneralDevices();
    } catch (e) {
        console.error('TCL: findAllGeneralDevicesSvc -> e', e);
        throw e;
    }
};

export const updateGeneralDeviceSvc = async (id: any, dataToUpdate: any = {}) => {
    try {
        return await updateGeneralDevice(id, dataToUpdate);
    } catch (e) {
        logger.error('TCL: updateGeneralDeviceSvc -> e', e);
        throw e;
    }
};

export const deleteGeneralDeviceSvc = async (id: any) => {
    try {
        return await deleteGeneralDevice(id);
    } catch (e) {
        logger.error('TCL: deleteGeneralDeviceSvc -> e', e);
        throw e;
    }
};
