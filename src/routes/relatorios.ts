import express from 'express';
import { estatisticasGeraisController, utilizacaoGuindastesController, faturamentoPorPeriodoController, clientesTopController } from '../controllers/relatorios';

const router = express.Router();

router.get('/estatisticas-gerais', estatisticasGeraisController);
router.get('/utilizacao-guindastes', utilizacaoGuindastesController);
router.get('/faturamento-periodo', faturamentoPorPeriodoController);
router.get('/clientes-top', clientesTopController);

export default router;
