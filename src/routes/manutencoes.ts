import express from 'express';
import { listManutencoes, createManutencaoController, updateManutencaoController } from '../controllers/manutencoes';

const router = express.Router();

router.get('/', listManutencoes);
router.post('/', createManutencaoController);
router.put('/:id', updateManutencaoController);

export default router;
