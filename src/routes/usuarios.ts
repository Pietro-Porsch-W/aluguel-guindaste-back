import express from 'express';
import { listUsuarios, createUsuarioController, updateUsuarioController } from '../controllers/usuarios';
import { requireRole } from '../core/authorization';

const router = express.Router();

router.get('/', listUsuarios);
router.post('/', createUsuarioController);
// router.post('/', requireRole('admin'), createUsuarioController);
router.put('/:id', updateUsuarioController);

export default router;
