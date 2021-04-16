import { findAllTransactions } from '@db/entity/deviceTransaction/deviceTransactionDao';
import logger from '@shared/Logger';

export const findAllDeviceTransactionSvc = async () => {
    try {
        return await findAllTransactions();
    } catch (e) {
        logger.error('TCL: findAllDeviceTransactionSvc -> e', e);
        throw e;
    }
};