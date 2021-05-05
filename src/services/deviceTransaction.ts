import {findAllTransactions, findInventoryTransactions} from '@db/entity/deviceTransaction/deviceTransactionDao';
import logger from '@shared/Logger';

export const findAllDeviceTransactionSvc = async () => {
    try {
        return await findAllTransactions();
    } catch (e) {
        logger.error('TCL: findAllDeviceTransactionSvc -> e', e);
        throw e;
    }
};

export const findInventoryDeviceTransactionSvc = async (inventoryId: number) => {
    try {
        return await findInventoryTransactions(inventoryId);
    } catch (e) {
        logger.error('TCL: findAllDeviceTransactionSvc -> e', e);
        throw e;
    }
};
