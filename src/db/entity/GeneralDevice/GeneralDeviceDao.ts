import { getManager, getConnection } from "typeorm";
import { GeneralDevice } from "@db/entity/GeneralDevice/GeneralDevice";
import { ErrorHandler } from "@helpers/ErrorHandler";

export const createGeneralDevice = async (generalDevice: any) => {
    try {
        const generalDeviceRepository = getManager().getRepository(GeneralDevice);
        await generalDeviceRepository.save(generalDevice);
        return GeneralDevice;
    } catch (error) {
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }
};

export const findGeneralDevice = async (criteria: any) => {
    try {
        const generalDeviceRepository = getManager().getRepository(GeneralDevice);
        return await generalDeviceRepository.findOne({
            where: criteria
        });
    } catch (error) {
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }
};

export const findAllGeneralDevices = async () => {
    try {
        const generalDeviceRepository = getManager().getRepository(GeneralDevice);
        const genDevices = await generalDeviceRepository.find();
        return genDevices;
    } catch (error) {
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }
};

export const updateGeneralDevice = async (id: any, dataToUpdate: any) => {
    try {
        const generalDeviceRepository = getManager().getRepository(GeneralDevice);
        const update = await generalDeviceRepository.update(id, { ...dataToUpdate });
        if (update.affected === 0)
            throw new ErrorHandler(404, "GeneralDevice not found");
        return await generalDeviceRepository.findOne({ id });
    } catch (error) {
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }
};

export const deleteGeneralDevice = async (id: any) => {
    try {
        const generalDeviceRepository = getManager().getRepository(GeneralDevice);
        const data = await generalDeviceRepository.delete({ id });
        return { CategoriesDeleted: data.affected };
    } catch (error) {
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }
};
