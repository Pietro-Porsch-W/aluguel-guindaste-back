import { Request, Response } from 'express';
import { getAllOfertas, createOferta, updateOferta, getOfertaId } from '../services/ofertas';

export const listOfertas = async (req: Request, res: Response) => {
  try {
    const rows = await getAllOfertas();
    res.json(rows);
  } catch (error) {
    console.error('Erro listOfertas:', error);
    res.status(500).json({ error: 'Erro ao buscar ofertas' });
  }
};

export const createOfertaController = async (req: Request, res: Response) => {
  try {
    // if (!(req as any).user) return res.status(401).json({ error: 'Unauthorized' });
    const payload = req.body;
    if (!payload || !payload.id_guindaste) return res.status(400).json({ error: 'id_guindaste é obrigatório' });
    const created = await createOferta(payload);
    res.status(201).json(created);
  } catch (error) {
    console.error('Erro createOfertaController:', error);
    res.status(500).json({ error: 'Erro ao criar oferta' });
  }
};

export const updateOfertaController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'ID é obrigatório' });
    const updates = req.body;
    const exists = await getOfertaId(id);
    if (!exists) return res.status(404).json({ error: 'Oferta não encontrada' });
    const updated = await updateOferta(id, updates);
    res.json(updated);
  } catch (error) {
    console.error('Erro updateOfertaController:', error);
    res.status(500).json({ error: 'Erro ao atualizar oferta' });
  }
};
