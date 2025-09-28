import { Request, Response } from 'express';
import { getAllLocacoes, createLocacao, updateLocacao, getLocacaoId } from '../services/locacao';

export const listLocacoes = async (req: Request, res: Response) => {
  try {
    const rows = await getAllLocacoes();
    res.json(rows);
  } catch (error) {
    console.error('Erro listLocacoes:', error);
    res.status(500).json({ error: 'Erro ao buscar locações' });
  }
};

export const createLocacaoController = async (req: Request, res: Response) => {
  try {
    // if (!(req as any).user) return res.status(401).json({ error: 'Unauthorized' });
    const payload = req.body;
    if (!payload || !payload.id_cliente || !payload.id_guindaste) return res.status(400).json({ error: 'id_cliente e id_guindaste são obrigatórios' });
    const created = await createLocacao(payload);
    res.status(201).json(created);
  } catch (error) {
    console.error('Erro createLocacaoController:', error);
    res.status(500).json({ error: 'Erro ao criar locação' });
  }
};

export const updateLocacaoController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'ID é obrigatório' });
    const updates = req.body;
    const exists = await getLocacaoId(id);
    if (!exists) return res.status(404).json({ error: 'Locação não encontrada' });
    const updated = await updateLocacao(id, updates);
    res.json(updated);
  } catch (error) {
    console.error('Erro updateLocacaoController:', error);
    res.status(500).json({ error: 'Erro ao atualizar locação' });
  }
};
