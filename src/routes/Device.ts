import { Router } from 'express'
import { joiValidator } from '@middlewares/joi';
import {
    createDeviceCtrl,
    findDeviceCtrl,
    findAllDevicesCtrl,
    updateDeviceCtrl,
    deleteDeviceCtrl, updateLocationDeviceCtrl
} from '@controllers/Device';
import {createDeviceSchema, updateDeviceSchema, updateLocationDevice} from '@shared/joi/Device';
import { sessionCheck } from '@middlewares/auth/auth';

const router = Router();

router.post('/', [sessionCheck, joiValidator(createDeviceSchema)], createDeviceCtrl);
router.get('/', [sessionCheck], findAllDevicesCtrl);
router.get('/inventory/:id', [sessionCheck], findAllDevicesCtrl);
router.get('/:id', [sessionCheck], findDeviceCtrl);
router.put('/:id', [sessionCheck, joiValidator(updateDeviceSchema)], updateDeviceCtrl);
router.put('/location/:id', [sessionCheck, joiValidator(updateLocationDevice)], updateLocationDeviceCtrl);
router.delete('/:id', [sessionCheck], deleteDeviceCtrl);

export default router;
