import { getManager, getConnection } from 'typeorm';
import { Maker} from '@db/entity/Maker/Maker';
import { ErrorHandler } from '@helpers/ErrorHandler';

export const createMaker = async (maker: any) => {
    try {
        const makerRepository = getManager().getRepository(Maker);
        return await makerRepository.save(maker);
    } catch (error) {
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }
};

export const findMaker = async (criteria: any) => {
    try {
        const makerRepository = getManager().getRepository(Maker);
        return await makerRepository.findOne({
            where: criteria
        });
    } catch (error) {
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }
};

export const findAllMakers = async () => {
    try {
        const makerRepository = getManager().getRepository(Maker);
        const makers = await makerRepository.find();
        return makers;
    } catch (error) {
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }
};

export const updateMaker = async (id: any, dataToUpdate: any) => {
    try {
        const makerRepository = getManager().getRepository(Maker);
        const update = await makerRepository.update(id,{...dataToUpdate });
        if(update.affected === 0) throw new ErrorHandler(404, 'Maker not found');
        return await makerRepository.findOne({id});
    } catch (error) {
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }
};

export const deleteMaker = async (id: any) => {
    try {
        const makerRepository = getManager().getRepository(Maker);
        const data = await makerRepository.delete({id});
        return {makersDeleted : data.affected};
    } catch (error) {
        throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }
};
