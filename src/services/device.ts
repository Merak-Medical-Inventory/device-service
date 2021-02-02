import {
    createDevice,
    findDevice,
    findAllDevices,
    updateDevice,
    deleteDevice
} from '@db/entity/Device/DeviceDao';
import logger from "@shared/Logger";
import {getManager} from "typeorm";
import Device from "@entity/Device/Device";
import Inventory from "@entity/Inventory/Inventory";
import Record from "@entity/Record/Record";

export const createDeviceSvc = async (device: any) => {
    try {
        return await createDevice(device);
    } catch (e) {
        console.error('TCL: createDeviceSvc -> e', e);
        throw e;
    }
};

export const findDeviceSvc = async (device: any) => {
    try {
        return await findDevice(device);
    } catch (e) {
        console.error('TCL: findDeviceSvc -> e', e);
        throw e;
    }
};

export const findDevicesDepartmentSvc = async (device: any) => {
    try {
        return await findDevice(device);
    } catch (e) {
        console.error('TCL: findDeviceSvc -> e', e);
        throw e;
    }
};

export const findAllDevicesSvc = async () => {
    try {
        return await findAllDevices();
    } catch (e) {
        console.error('TCL: findAllDevicesSvc -> e', e);
        throw e;
    }
};

export const updateDeviceSvc = async (id: any, dataToUpdate: any = {}) => {
    try {
        return await updateDevice(id, dataToUpdate);
    } catch (e) {
        logger.error('TCL: updateDeviceSvc -> e', e);
        throw e;
    }
};

export const deleteDeviceSvc = async (id: any) => {
    try {
        return await deleteDevice(id);
    } catch (e) {
        logger.error('TCL: deleteDeviceSvc -> e', e);
        throw e;
    }
};

export const updateLocationDeviceSvc = async (id: number, idInventory: number) => {
    try{
        return await getManager().transaction(async (manager) => {
            const devices = await manager.find(Device,{
                relations : ["location","Record","Record.location"],
                where : {
                    id
                }
            });
            const device : Device = devices[0];
            const lastRecord: any = device.Record.sort((a , b)=> a.device.id.valueOf() - b.device.id.valueOf());
            lastRecord.endDate = new Date();
            await manager.save(lastRecord);
            const inventories = await manager.find(Inventory,{
                where : {
                    idInventory
                }
            });
            const inventory : Inventory = inventories[0];
            device.location = inventory;
            const record: Record = new Record();
            record.location = inventory;
            record.device = device;
            record.initialDate = new Date();
            await manager.save(record);
            device.Record.push(record);
            return await manager.save(device);
        });
    } catch (e) {
        logger.error("TCL: UpdateLocationDeviceSvc -> e", e);
        throw e;
    }
};
