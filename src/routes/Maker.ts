import { Router } from 'express'
import { joiValidator } from '@middlewares/joi';
import {
    createMakerCtrl,
    findMakerCtrl,
    findAllMakersCtrl,
    updateMakerCtrl,
    deleteMakerCtrl
} from '@controllers/Maker';
import { createMakerSchema} from '@shared/joi/Maker';
import { sessionCheck } from '@middlewares/auth/auth';

const router = Router();

router.post('/', [sessionCheck, joiValidator(createMakerSchema)], createMakerCtrl);
router.get('/', [sessionCheck], findAllMakersCtrl);
router.get('/:id', [sessionCheck], findMakerCtrl);
router.put('/:id', [sessionCheck, joiValidator(createMakerSchema)], updateMakerCtrl);
router.delete('/:id', [sessionCheck], deleteMakerCtrl);

export default router;
