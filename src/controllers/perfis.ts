import { Request, Response } from 'express';
import { getAllPerfis, createPerfil, updatePerfil, setPerfilPermissoes, getPerfilById } from '../services/perfil';

export const listPerfis = async (req: Request, res: Response) => {
  try {
    const perfis = await getAllPerfis();
    // transform permissoes into plain array
    const mapped = perfis.map((p: any) => ({
      ...p,
      permissoes: p.permissoes?.map((pp: any) => pp.permissao).filter(Boolean) || [],
    }));
    res.json(mapped);
  } catch (error) {
    console.error('Erro listPerfis:', error);
    res.status(500).json({ error: 'Erro ao buscar perfis' });
  }
};

export const createPerfilController = async (req: Request, res: Response) => {
  try {
    // if (!(req as any).user) return res.status(401).json({ error: 'Unauthorized' });
    const payload = req.body;
    if (!payload || !payload.nome) return res.status(400).json({ error: 'nome é obrigatório' });
    const created = await createPerfil(payload);
    res.status(201).json(created);
  } catch (error) {
    console.error('Erro createPerfilController:', error);
    res.status(500).json({ error: 'Erro ao criar perfil' });
  }
};

export const updatePerfilController = async (req: Request, res: Response) => {
  try {
    // if (!(req as any).user) return res.status(401).json({ error: 'Unauthorized' });
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'ID é obrigatório' });
    const updates = req.body;
    const updated = await updatePerfil(id, updates);
    res.json(updated);
  } catch (error) {
    console.error('Erro updatePerfilController:', error);
    res.status(500).json({ error: 'Erro ao atualizar perfil' });
  }
};

export const setPerfilPermissoesController = async (req: Request, res: Response) => {
  try {
    // if (!(req as any).user) return res.status(401).json({ error: 'Unauthorized' });
    const { id } = req.params;
    const { permissaoIds } = req.body;
    if (!id) return res.status(400).json({ error: 'ID é obrigatório' });
    if (!Array.isArray(permissaoIds)) return res.status(400).json({ error: 'permissaoIds deve ser um array' });
    await setPerfilPermissoes(id, permissaoIds);
    const perfil = await getPerfilById(id);
    const mapped = { ...perfil, permissoes: perfil?.permissoes?.map((pp: any) => pp.permissao).filter(Boolean) || [] };
    res.json(mapped);
  } catch (error) {
    console.error('Erro setPerfilPermissoesController:', error);
    res.status(500).json({ error: 'Erro ao atualizar permissões do perfil' });
  }
};
