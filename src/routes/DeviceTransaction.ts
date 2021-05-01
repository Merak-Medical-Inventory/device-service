import { Router } from 'express'
import { sessionCheck } from '@middlewares/auth/auth';
import {
    findAllDeviceTransactionCtrl,
    findBcDeviceTransactionCtrl,
    findInventoryDeviceTransactionCtrl
} from '@controllers/DeviceTransactions';

const router = Router();

router.get('/', [sessionCheck], findAllDeviceTransactionCtrl);
router.get('/:id', [sessionCheck], findBcDeviceTransactionCtrl);
router.get('/inventory/:id', [sessionCheck], findInventoryDeviceTransactionCtrl);

export default router;
