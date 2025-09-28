import express from 'express';
import clientesRouter from './clientes';
import guindastesRouter from './guindastes';
import locacoesRouter from './locacoes';
import manutencoesRouter from './manutencoes';
import ofertasRouter from './ofertas';
import usuariosRouter from './usuarios';
import perfisRouter from './perfis';
import permissoesRouter from './permissoes';
import relatoriosRouter from './relatorios';
// import verifySupabaseJwt from '../core/auth';

const router = express.Router();

// Verify JWT for all /api routes to populate req.user from Supabase token
// router.use(verifySupabaseJwt);

router.use('/clientes', clientesRouter);
router.use('/guindastes', guindastesRouter);
router.use('/locacoes', locacoesRouter);
router.use('/manutencoes', manutencoesRouter);
router.use('/ofertas', ofertasRouter);
router.use('/usuarios', usuariosRouter);
router.use('/perfis', perfisRouter);
router.use('/permissoes', permissoesRouter);
router.use('/relatorios', relatoriosRouter);

export default router;
