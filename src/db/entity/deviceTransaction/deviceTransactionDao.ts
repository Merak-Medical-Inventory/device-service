import { getManager } from 'typeorm';
import Transaction from '@db/entity/deviceTransaction/deviceTransaction';
import { ErrorHandler } from '@helpers/ErrorHandler';

export const findAllTransactions = async () => {
  try {
    const deviceTransactionRepository = getManager().getRepository(Transaction);
    return await deviceTransactionRepository.find({
      relations: ['sender', 'inventory1','inventory2','device', 'device.generalDevice'],
      order : {
        date : 'DESC'
      }
  })
  } catch (error) {
    throw new ErrorHandler(500, `${error.name} ${error.message}`);
  }
};

export const findInventoryTransactions = async (inventoryId: number) => {
  try {
    const deviceTransactionRepository = getManager().getRepository(Transaction);
    return await deviceTransactionRepository.find({
      relations: ['sender', 'inventory1','inventory2','device', 'device.generalDevice'],
      where: [{
        inventory1: inventoryId
      },
        {
          inventory2: inventoryId
        }]
    })
  } catch (error) {
    throw new ErrorHandler(500, `${error.name} ${error.message}`);
  }
};

export const createTransaction = async (transaction: any) => {
  try {
    const deviceTransactionRepository = getManager().getRepository(Transaction);
    await deviceTransactionRepository.save(transaction);
    return transaction;
  } catch (error) {
    throw new ErrorHandler(500, `${error.name} ${error.message}`);
  }
};

export const updateTransaction = async (id: any, dataToUpdate: any) => {
  try {
    const deviceTransactionRepository = getManager().getRepository(Transaction);
    const update = await deviceTransactionRepository.update(id,{...dataToUpdate });
    if(update.affected = 0) throw new ErrorHandler(404, 'Transaction not found');
    return await deviceTransactionRepository.findOne({id});
  } catch (error) {
    throw new ErrorHandler(500, `${error.name} ${error.message}`);
  }
};

export const deleteTransaction = async (id: any) => {
  try {
    const deviceTransactionRepository = getManager().getRepository(Transaction);
    const data = await deviceTransactionRepository.delete({id});
    return {transactionsDeleted : data.affected};
  } catch (error) {
    throw new ErrorHandler(500, `${error.name} ${error.message}`);
  }
};
