import { Router } from 'express';
import GeneralDeviceRouter from './GeneralDevice';
import MakerRouter from './Maker'
import DeviceRouter from './Device'
import MaintenanceRouter from './Maintenance';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/generalDevice', GeneralDeviceRouter);
router.use('/maker', MakerRouter);
router.use('/device', DeviceRouter);
router.use('/maintenance', MaintenanceRouter)

// Export the base-router
export default router;
