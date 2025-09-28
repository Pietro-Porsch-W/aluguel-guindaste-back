import { Request, Response } from 'express';
import { getAllPermissoes, createPermissao, updatePermissao } from '../services/permissao';

export const listPermissoes = async (req: Request, res: Response) => {
  try {
    const rows = await getAllPermissoes();
    res.json(rows);
  } catch (error) {
    console.error('Erro listPermissoes:', error);
    res.status(500).json({ error: 'Erro ao buscar permissões' });
  }
};

export const createPermissaoController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    if (!payload || !payload.nome) return res.status(400).json({ error: 'nome é obrigatório' });
    const created = await createPermissao(payload);
    res.status(201).json(created);
  } catch (error) {
    console.error('Erro createPermissaoController:', error);
    res.status(500).json({ error: 'Erro ao criar permissão' });
  }
};

export const updatePermissaoController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'ID é obrigatório' });
    const updates = req.body;
    const updated = await updatePermissao(id, updates);
    res.json(updated);
  } catch (error) {
    console.error('Erro updatePermissaoController:', error);
    res.status(500).json({ error: 'Erro ao atualizar permissão' });
  }
};
