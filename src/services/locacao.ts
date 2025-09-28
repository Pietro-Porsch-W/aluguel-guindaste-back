import { prisma } from './prisma';

export const getAllLocacoes = async () => {
  return prisma.locacoes.findMany({ orderBy: { dt_created: 'desc' } });
};

export const createLocacao = async (data: any) => {
  // Map incoming payload to DB column names and normalize types
  const payload: any = {
    id_cliente: data.id_cliente,
    id_guindaste: data.id_guindaste,
    dt_inicio: data.data_inicio ? new Date(data.data_inicio) : (data.dt_inicio ? new Date(data.dt_inicio) : undefined),
    data_fim_prevista: data.data_fim_prevista ? new Date(data.data_fim_prevista) : null,
    data_fim_real: data.data_fim_real ? new Date(data.data_fim_real) : null,
    valor_total_previsto: data.valor_total_previsto != null ? Number(data.valor_total_previsto) : 0,
    valor_total_final: data.valor_total_final != null ? Number(data.valor_total_final) : null,
    status_locacao: data.status_locacao ?? undefined,
    observacoes: data.observacoes ?? null,
    // dt_created and dt_updated are set by DB defaults, but provide them if payload includes
    dt_created: data.dt_created ? new Date(data.dt_created) : undefined,
    dt_updated: data.dt_updated ? new Date(data.dt_updated) : undefined,
  };

  return prisma.locacoes.create({ data: payload });
};

export const updateLocacao = async (id: string, updates: any) => {
  const payload: any = {
    ...updates,
  };
  if (updates.data_inicio) payload.dt_inicio = new Date(updates.data_inicio);
  if (updates.data_fim_prevista) payload.data_fim_prevista = new Date(updates.data_fim_prevista);
  if (updates.data_fim_real) payload.data_fim_real = new Date(updates.data_fim_real);
  if (updates.valor_total_previsto != null) payload.valor_total_previsto = Number(updates.valor_total_previsto);
  if (updates.valor_total_final != null) payload.valor_total_final = Number(updates.valor_total_final);

  return prisma.locacoes.update({ where: { id }, data: payload });
};

export const getLocacaoId = async (id: string) => {
  return prisma.locacoes.findUnique({ where: { id } });
};
