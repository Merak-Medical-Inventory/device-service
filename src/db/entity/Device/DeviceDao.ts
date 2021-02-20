import { getManager } from "typeorm";
import Device from "@db/entity/Device/Device";
import { ErrorHandler } from "@helpers/ErrorHandler";
import Record from "@entity/Record/Record";

export const findAllDevicesDepartment = async (criteria: any) => {
    try {
        const deviceRepository = getManager().getRepository(Device);
        return await deviceRepository.find({
            relations: ["generalDevice","brand","Maintenance","location","Record","Record.location"],
            where: criteria
        })
    } catch (error) {
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }
};

export const findAllDevices = async () => {
    try {
        const deviceRepository = getManager().getRepository(Device);
        return await deviceRepository.find({
            relations: ["generalDevice","brand","maker","Maintenance","location","Record","Record.location"]
        })
    } catch (error) {
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }
};

export const findDevice = async (criteria: any) => {
    try {
        const deviceRepository = getManager().getRepository(Device);
        return await deviceRepository.findOne({
            relations: ["generalDevice","brand","Maintenance","location","maker"],
            where: criteria
        })
    } catch (error) {
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }
};

export const createDevice = async (device: any) => {
    try {
        const deviceRepository = getManager().getRepository(Device);
        await deviceRepository.save(device);
        const record: any = {
            initialDate : new Date(),
            device: device.id,
            location : device.location
        };
        const recordRepository = getManager().getRepository(Record);
        await recordRepository.save(record);
        return device;
    } catch (error) {
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }
};

export const updateDevice = async (id: any, dataToUpdate: any) => {
    try {
        const deviceRepository = getManager().getRepository(Device);
        const update = await deviceRepository.update(id,{...dataToUpdate });
        if(update.affected === 0) throw new ErrorHandler(404, "Device not found");
        return await deviceRepository.findOne({id});
    } catch (error) {
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }
};

export const deleteDevice = async (id: any) => {
    try {
        const deviceRepository = getManager().getRepository(Device);
        const data = await deviceRepository.delete({id});
        return {DevicesDeleted : data.affected};
    } catch (error) {
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }
};
