import { Router } from 'express'
import { sessionCheck } from '@middlewares/auth/auth';
import { findAllDeviceTransactionCtrl, findBcDeviceTransactionCtrl } from '@controllers/DeviceTransactions';

const router = Router();

router.get('/', [sessionCheck], findAllDeviceTransactionCtrl);
router.get('/:id', [sessionCheck], findBcDeviceTransactionCtrl);

export default router;