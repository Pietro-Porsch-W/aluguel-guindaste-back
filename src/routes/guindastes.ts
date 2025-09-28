import express from 'express';
import { listGuindastes, createGuindasteController, updateGuindasteController } from '../controllers/guindastes';


const router = express.Router();

router.get('/', listGuindastes);
router.post('/', createGuindasteController);
router.put('/:id', updateGuindasteController);

export default router;
