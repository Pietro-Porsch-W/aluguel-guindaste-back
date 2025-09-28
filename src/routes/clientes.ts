import express from 'express';
import { listClientes, createClienteController, updateClienteController } from '../controllers/clientes';

const router = express.Router();

router.get('/', listClientes);
router.post('/', createClienteController);
router.put('/:id', updateClienteController);

export default router;
