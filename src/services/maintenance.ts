import {
    createMaintenance,
    findMaintenance,
    findAllMaintenances,
    updateMaintenance,
    deleteMaintenance
} from '@db/entity/Maintenance/MaintenanceDao';
import logger from "@shared/Logger";

export const createMaintenanceSvc = async (Maintenance: any) => {
    try {
        return await createMaintenance(Maintenance);
    } catch (e) {
        console.error('TCL: createMaintenanceSvc -> e', e);
        throw e;
    }
};

export const findMaintenanceSvc = async (Maintenance: any) => {
    try {
        return await findMaintenance(Maintenance);
    } catch (e) {
        console.error('TCL: findMaintenanceSvc -> e', e);
        throw e;
    }
};

export const findAllMaintenancesSvc = async () => {
    try {
        return await findAllMaintenances();
    } catch (e) {
        console.error('TCL: findAllMaintenancesSvc -> e', e);
        throw e;
    }
};

export const updateMaintenanceSvc = async (id: any, dataToUpdate: any = {}) => {
    try {
        return await updateMaintenance(id, dataToUpdate);
    } catch (e) {
        logger.error('TCL: updateMaintenanceSvc -> e', e);
        throw e;
    }
};

export const deleteMaintenanceSvc = async (id: any) => {
    try {
        return await deleteMaintenance(id);
    } catch (e) {
        logger.error('TCL: deleteMaintenanceSvc -> e', e);
        throw e;
    }
};
