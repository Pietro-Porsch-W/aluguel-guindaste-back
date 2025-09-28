import { Request, Response } from 'express';
import { getAllGuindastes, createGuindaste, updateGuindaste, getGuindasteId } from '../services/guindaste';

export const listGuindastes = async (req: Request, res: Response) => {
  try {
    const rows = await getAllGuindastes();
    res.json(rows);
  } catch (error) {
    console.error('Erro listGuindastes:', error);
    res.status(500).json({ error: 'Erro ao buscar guindastes' });
  }
};

export const createGuindasteController = async (req: Request, res: Response) => {
  try {
    // if (!(req as any).user) return res.status(401).json({ error: 'Unauthorized' });
    const payload = req.body;
    if (!payload || !payload.modelo) return res.status(400).json({ error: 'modelo é obrigatório' });
    const created = await createGuindaste(payload);
    res.status(201).json(created);
  } catch (error) {
    console.error('Erro createGuindasteController:', error);
    res.status(500).json({ error: 'Erro ao criar guindaste' });
  }
};

export const updateGuindasteController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
  if (!id) return res.status(400).json({ error: 'ID é obrigatório' });
  const exists = await getGuindasteId(id);
    if (!exists) return res.status(404).json({ error: 'Guindaste não encontrado' });
  const updated = await updateGuindaste(id, updates);
    res.json(updated);
  } catch (error) {
    console.error('Erro updateGuindasteController:', error);
    res.status(500).json({ error: 'Erro ao atualizar guindaste' });
  }
};
