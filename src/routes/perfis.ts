import express from 'express';
import { listPerfis, createPerfilController, updatePerfilController, setPerfilPermissoesController } from '../controllers/perfis';
import { requireRole } from '../core/authorization';

const router = express.Router();

router.get('/', listPerfis);
router.post('/', createPerfilController);
router.put('/:id', updatePerfilController);
router.post('/:id/permissoes', setPerfilPermissoesController);
// router.post('/:id/permissoes', requireRole('admin'), setPerfilPermissoesController);

export default router;
