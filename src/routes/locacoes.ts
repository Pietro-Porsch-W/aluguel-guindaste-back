import express from 'express';
import { listLocacoes, createLocacaoController, updateLocacaoController } from '../controllers/locacoes';

const router = express.Router();

router.get('/', listLocacoes);
router.post('/', createLocacaoController);
router.put('/:id', updateLocacaoController);

export default router;
