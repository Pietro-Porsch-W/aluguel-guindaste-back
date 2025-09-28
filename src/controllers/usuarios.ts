import { Request, Response } from 'express';
import { getAllUsuarios, createUsuario, updateUsuario, getUsuarioId } from '../services/usuario';

export const listUsuarios = async (req: Request, res: Response) => {
  try {
    const rows = await getAllUsuarios();
    res.json(rows);
  } catch (error) {
    console.error('Erro listUsuarios:', error);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
};

export const createUsuarioController = async (req: Request, res: Response) => {
  try {
    // if (!(req as any).user) return res.status(401).json({ error: 'Unauthorized' });
    const payload = req.body;
    if (!payload || !payload.email || !payload.nome_completo) return res.status(400).json({ error: 'email e nome_completo são obrigatórios' });
    const created = await createUsuario(payload);
    // if service attached a temp_password, include it in response for admin use
    const response: any = { ...created };
    // service may attach a transient temp_password for admin to deliver
    if ((created as any).temp_password) {
      response.temp_password = (created as any).temp_password;
    }
    res.status(201).json(response);
  } catch (error) {
    console.error('Erro createUsuarioController:', error);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};

export const updateUsuarioController = async (req: Request, res: Response) => {
  try {
    // if (!(req as any).user) return res.status(401).json({ error: 'Unauthorized' });
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'ID é obrigatório' });
    const updates = req.body;
    const exists = await getUsuarioId(id);
    if (!exists) return res.status(404).json({ error: 'Usuário não encontrado' });
    const updated = await updateUsuario(id, updates);
    res.json(updated);
  } catch (error) {
    console.error('Erro updateUsuarioController:', error);
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
};
