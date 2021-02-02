import { Router } from 'express'
import { joiValidator } from '@middlewares/joi';
import {
    createGeneralDeviceCtrl,
    findGeneralDeviceCtrl,
    findAllGeneralDevicesCtrl,
    updateGeneralDeviceCtrl,
    deleteGeneralDeviceCtrl
} from '@controllers/GeneralDevice';
import { createGeneralDeviceSchema} from '@shared/joi/GeneralDevice';
import { sessionCheck } from '@middlewares/auth/auth';

const router = Router();

router.post('/', [sessionCheck, joiValidator(createGeneralDeviceSchema)], createGeneralDeviceCtrl);
router.get('/', [sessionCheck], findAllGeneralDevicesCtrl);
router.get('/:id', [sessionCheck], findGeneralDeviceCtrl);
router.put('/:id', [sessionCheck, joiValidator(createGeneralDeviceSchema)], updateGeneralDeviceCtrl);
router.delete('/:id', [sessionCheck], deleteGeneralDeviceCtrl);

export default router;
