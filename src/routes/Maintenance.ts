import { Router } from 'express'
import { joiValidator } from '@middlewares/joi';
import {
    createMaintenanceCtrl,
    findMaintenanceCtrl,
    findAllMaintenancesCtrl,
    updateMaintenanceCtrl,
    deleteMaintenanceCtrl, findAllMaintenancesDepartmentCtrl
} from '@controllers/Maintenance';
import { createMaintenanceSchema} from '@shared/joi/Maintenance';
import { sessionCheck } from '@middlewares/auth/auth';

const router = Router();

router.post('/', [sessionCheck, joiValidator(createMaintenanceSchema)], createMaintenanceCtrl);
router.get('/', [sessionCheck], findAllMaintenancesCtrl);
router.get('/:id', [sessionCheck], findMaintenanceCtrl);
router.put('/:id', [sessionCheck, joiValidator(createMaintenanceSchema)], updateMaintenanceCtrl);
router.delete('/:id', [sessionCheck], deleteMaintenanceCtrl);
router.get('/inventory/:id', [sessionCheck], findAllMaintenancesDepartmentCtrl);

export default router;
