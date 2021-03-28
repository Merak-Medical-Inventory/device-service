import { Router } from 'express'
import { joiValidator } from '@middlewares/joi';
import {
    createDeviceCtrl,
    findDeviceCtrl,
    findAllDevicesCtrl,
    updateDeviceCtrl,
    deleteDeviceCtrl, updateLocationDeviceCtrl, findDevicesDepartmentCtrl, findOrderDevicesCtrl
} from '@controllers/Device';
import {
    createDeviceSchema, orderDeviceSchema,
    updateDeviceSchema,
    updateLocationDeviceSchema
} from '@shared/joi/Device';
import { sessionCheck } from '@middlewares/auth/auth';

const router = Router();

router.post('/', [sessionCheck, joiValidator(createDeviceSchema)], createDeviceCtrl);
router.get('/', [sessionCheck], findAllDevicesCtrl);
router.get('/inventory/:id', [sessionCheck], findDevicesDepartmentCtrl);
router.get('/:id', [sessionCheck], findDeviceCtrl);
router.post('/order', [sessionCheck, joiValidator(orderDeviceSchema)], findOrderDevicesCtrl);
router.put('/:id', [sessionCheck, joiValidator(updateDeviceSchema)], updateDeviceCtrl);
router.put('/location/:id', [sessionCheck, joiValidator(updateLocationDeviceSchema)], updateLocationDeviceCtrl);
router.delete('/:id', [sessionCheck], deleteDeviceCtrl);

export default router;
