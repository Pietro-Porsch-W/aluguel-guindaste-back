import { Request, Response } from 'express';
import { estatisticasGerais, utilizacaoGuindastes, faturamentoPorPeriodo, clientesTop } from '../services/relatorio';

export const estatisticasGeraisController = async (req: Request, res: Response) => {
  try {
    const data = await estatisticasGerais();
    res.json(data);
  } catch (error) {
    console.error('Erro estatisticasGeraisController:', error);
    res.status(500).json({ error: 'Erro ao calcular estatísticas' });
  }
};

export const utilizacaoGuindastesController = async (req: Request, res: Response) => {
  try {
    const { inicio, fim } = req.query;
    const start = inicio ? new Date(String(inicio)) : new Date(Date.now() - 1000 * 60 * 60 * 24 * 30);
    const end = fim ? new Date(String(fim)) : new Date();
    const data = await utilizacaoGuindastes(start, end);
    res.json(data);
  } catch (error) {
    console.error('Erro utilizacaoGuindastesController:', error);
    res.status(500).json({ error: 'Erro ao calcular utilização' });
  }
};

export const faturamentoPorPeriodoController = async (req: Request, res: Response) => {
  try {
    const { inicio, fim } = req.query;
    const start = inicio ? new Date(String(inicio)) : new Date(Date.now() - 1000 * 60 * 60 * 24 * 180);
    const end = fim ? new Date(String(fim)) : new Date();
    const data = await faturamentoPorPeriodo(start, end);
    res.json(data);
  } catch (error) {
    console.error('Erro faturamentoPorPeriodoController:', error);
    res.status(500).json({ error: 'Erro ao calcular faturamento' });
  }
};

export const clientesTopController = async (req: Request, res: Response) => {
  try {
    const { inicio, fim } = req.query;
    const start = inicio ? new Date(String(inicio)) : new Date(Date.now() - 1000 * 60 * 60 * 24 * 365);
    const end = fim ? new Date(String(fim)) : new Date();
    const data = await clientesTop(start, end);
    res.json(data);
  } catch (error) {
    console.error('Erro clientesTopController:', error);
    res.status(500).json({ error: 'Erro ao calcular clientes top' });
  }
};
