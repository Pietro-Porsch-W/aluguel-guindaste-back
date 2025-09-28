import { Request, Response } from 'express';
import { getAllClientes, createCliente, updateCliente, getClienteId } from '../services/cliente';

export const listClientes = async (req: Request, res: Response) => {
  try {
    const clientes = await getAllClientes();
    // map fields if necessary (ex: dt_cadastro -> data_cadastro)
    const mapped = clientes.map((c: any) => ({
      ...c,
      data_cadastro: c.dt_cadastro || c.data_cadastro,
      usuario_id: c.usuarioId || c.usuario_id || null,
    }));
    res.json(mapped);
  } catch (error) {
    console.error('Erro listClientes:', error);
    res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
};

export const createClienteController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    // Basic validation
    if (!payload || !payload.nome || !payload.tipo_cliente) {
      return res.status(400).json({ error: 'Payload inválido: nome e tipo_cliente são obrigatórios' });
    }

    // normalize if backend uses different keys
    const dataToCreate = {
      nome: payload.nome,
      tipo_cliente: payload.tipo_cliente,
      documento: payload.documento || '',
      email: payload.email || '',
      telefone: payload.telefone || '',
      endereco: payload.endereco || '',
      ativo: typeof payload.ativo === 'boolean' ? payload.ativo : true,
      usuarioId: payload.usuario_id || payload.usuarioId || null,
    };

    const cliente = await createCliente(dataToCreate);

    res.status(201).json({
      ...cliente,
      data_cadastro: cliente.dt_cadastro || null,
      usuario_id: cliente.usuarioId || null,
    });
  } catch (error) {
    console.error('Erro createClienteController:', error);
    res.status(500).json({ error: 'Erro ao criar cliente' });
  }
};

export const updateClienteController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!id) return res.status(400).json({ error: 'ID é obrigatório' });

    // Check exists
    const exists = await getClienteId(id);
    if (!exists) return res.status(404).json({ error: 'Cliente não encontrado' });

    const updated = await updateCliente(id, updates);

    res.json({ ...updated, data_cadastro: updated.dt_cadastro || null, usuario_id: updated.usuarioId || null });
  } catch (error) {
    console.error('Erro updateClienteController:', error);
    res.status(500).json({ error: 'Erro ao atualizar cliente' });
  }
};
