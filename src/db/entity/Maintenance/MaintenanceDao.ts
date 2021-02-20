import { getManager, getConnection } from "typeorm";
import { Maintenance } from "@db/entity/Maintenance/Maintenance";
import { ErrorHandler } from "@helpers/ErrorHandler";

export const createMaintenance = async (maintenance: any) => {
    try {
        const maintenanceRepository = getManager().getRepository(Maintenance);
        await maintenanceRepository.save(maintenance);
        return maintenance;
    } catch (error) {
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }
};

export const findMaintenance = async (criteria: any) => {
    try {
        const maintenanceRepository = getManager().getRepository(Maintenance);
        return await maintenanceRepository.findOne({
            relations: ["device", "device.generalDevice"],
            where: criteria
        });
    } catch (error) {
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }
};

export const findAllMaintenances = async () => {
    try {
        const maintenanceRepository = getManager().getRepository(Maintenance);
        const maintenances = await maintenanceRepository.find({
            relations: ["device", "device.generalDevice"]
        });
        return maintenances;
    } catch (error) {
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }
};

export const updateMaintenance = async (id: any, dataToUpdate: any) => {
    try {
        const maintenanceRepository = getManager().getRepository(Maintenance);
        const update = await maintenanceRepository.update(id, { ...dataToUpdate });
        if (update.affected === 0)
            throw new ErrorHandler(404, "Maintenance not found");
        return await maintenanceRepository.findOne({ id });
    } catch (error) {
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }
};

export const deleteMaintenance = async (id: any) => {
    try {
        const maintenanceRepository = getManager().getRepository(Maintenance);
        const data = await maintenanceRepository.delete({ id });
        return { maintenancesDeleted: data.affected };
    } catch (error) {
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }
};
