import { Router } from 'express';
import GeneralDeviceRouter from './GeneralDevice';
import MakerRouter from './Maker'

// Init router and path
const router = Router();

// Add sub-routes
router.use('/generalDevice', GeneralDeviceRouter);
router.use('/maker', MakerRouter);

// Export the base-router
export default router;
