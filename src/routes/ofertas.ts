import express from 'express';
import { listOfertas, createOfertaController, updateOfertaController } from '../controllers/ofertas';

const router = express.Router();

router.get('/', listOfertas);
router.post('/', createOfertaController);
// router.post('/', verifySupabaseJwt, createOfertaController);
router.put('/:id', updateOfertaController);

export default router;
