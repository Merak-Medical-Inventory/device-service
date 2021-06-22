import {
    createDevice,
    findDevice,
    findAllDevices,
    updateDevice,
    deleteDevice,
    findAllDevicesDepartment, findOrderDevices
} from '@db/entity/Device/DeviceDao';
import logger from "@shared/Logger";
import {getManager, Transaction} from "typeorm";
import Device from "@entity/Device/Device";
import Inventory from "@entity/Inventory/Inventory";
import Record from "@entity/Record/Record";
import DeviceTransaction from "@entity/deviceTransaction/deviceTransaction";
import { createDeviceTransaction } from '@helpers/deviceTransaction';
import { createTransaction } from '@db/entity/deviceTransaction/deviceTransactionDao';
import User from '@db/entity/user/User';


export const createDeviceSvc = async (device: any) => {
    try {
        const newDevice = await createDevice(device);
        const deviceTransaction = new DeviceTransaction();
        deviceTransaction.device = newDevice;
        const inventory = new Inventory()
        inventory.id = device.location;
        deviceTransaction.inventory1 = inventory;
        deviceTransaction.sender = new User();
        deviceTransaction.sender.id = parseInt(<string>process.env.USER_ID)
        deviceTransaction.date = new Date();
        const bcTransaction = await createDeviceTransaction(process.env.USER_ID || '','',deviceTransaction.inventory1.id.toString(),'',newDevice.id.toString(),deviceTransaction.date.toUTCString())
        deviceTransaction.bcTransactionId = bcTransaction.data.id;
        deviceTransaction.blockchainTx = bcTransaction.data.transactionHash;
        await createTransaction(deviceTransaction);
        return newDevice;
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

export const findDevicesDepartmentSvc = async (inventory: number) => {
    try {
        return await findAllDevicesDepartment(inventory);
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

export const findOrderDevicesSvc = async (order: boolean) => {
    try {
        return await findOrderDevices(order);
    } catch (e) {
        console.error('TCL: findOrderDeviceSvc -> e', e);
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
            const lastRecord = device.Record.sort((a , b)=> a.id.valueOf() - b.id.valueOf());
            console.log(lastRecord);
            lastRecord[0].endDate = new Date();
            console.log(lastRecord[0]);
            await manager.save(lastRecord[0]);
            const inventories = await manager.find(Inventory,{
                where : {
                    id: idInventory
                }
            });
            const deviceTransaction = new DeviceTransaction();
            deviceTransaction.device = device;
            deviceTransaction.inventory1 = device.location;
            const inventory : Inventory = inventories[0];
            deviceTransaction.inventory2 = inventory;
            device.location = inventory;
            const record: Record = new Record();
            record.location = inventory;
            record.initialDate = new Date();
            await manager.save(record);
            deviceTransaction.date = new Date();
            deviceTransaction.sender = new User();
            deviceTransaction.sender.id = parseInt(<string>process.env.USER_ID)
            const bcTransaction = await createDeviceTransaction(process.env.USER_ID || '','',deviceTransaction.inventory1.id.toString(),deviceTransaction.inventory2.id.toString(),device.id.toString(),deviceTransaction.date.toUTCString())
            deviceTransaction.bcTransactionId = bcTransaction.data.id;
            deviceTransaction.blockchainTx = bcTransaction.data.transactionHash;
            await manager.save(deviceTransaction);
            device.Record.push(record);
            return await manager.save(device);
        });
    } catch (e) {
        logger.error("TCL: UpdateLocationDeviceSvc -> e", e);
        throw e;
    }
};
