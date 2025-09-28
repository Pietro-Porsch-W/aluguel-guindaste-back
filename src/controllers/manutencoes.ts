import { Request, Response } from 'express';
import { getAllManutencoes, createManutencao, updateManutencao, getManutencaoId } from '../services/manutencao';

export const listManutencoes = async (req: Request, res: Response) => {
  try {
    const rows = await getAllManutencoes();
    res.json(rows);
  } catch (error) {
    console.error('Erro listManutencoes:', error);
    res.status(500).json({ error: 'Erro ao buscar manutenções' });
  }
};

export const createManutencaoController = async (req: Request, res: Response) => {
  try {
    // if (!(req as any).user) return res.status(401).json({ error: 'Unauthorized' });
    const payload = req.body;
    if (!payload || !payload.id_guindaste || !payload.data_inicio_manutencao) return res.status(400).json({ error: 'id_guindaste e data_inicio_manutencao são obrigatórios' });
    const created = await createManutencao(payload);
    res.status(201).json(created);
  } catch (error) {
    console.error('Erro createManutencaoController:', error);
    res.status(500).json({ error: 'Erro ao criar manutenção' });
  }
};

export const updateManutencaoController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'ID é obrigatório' });
    const updates = req.body;
    const exists = await getManutencaoId(id);
    if (!exists) return res.status(404).json({ error: 'Manutenção não encontrada' });
    const updated = await updateManutencao(id, updates);
    res.json(updated);
  } catch (error) {
    console.error('Erro updateManutencaoController:', error);
    res.status(500).json({ error: 'Erro ao atualizar manutenção' });
  }
};
