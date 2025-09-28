import express from 'express';
import { listPermissoes, createPermissaoController, updatePermissaoController } from '../controllers/permissoes';
import { requireRole } from '../core/authorization';

const router = express.Router();

router.get('/', listPermissoes);
// router.post('/', requireRole('admin'), createPermissaoController);
router.post('/', createPermissaoController);
// router.put('/:id', requireRole('admin'), updatePermissaoController);
router.put('/:id', updatePermissaoController);

export default router;
