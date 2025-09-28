import { prisma } from './prisma';
import { Prisma } from '@prisma/client';

export const getAllGuindastes = async () => {
  return prisma.guindastes.findMany({ orderBy: { createdAt: 'desc' } });
};

export const createGuindaste = async (data: any) => {
  console.log('Creating guindaste with data:', data);

  // Normalize numeric/decimal fields to numbers (Prisma Decimal will accept strings/numbers)
  const payload: any = {
    modelo: data.modelo,
    capacidade_toneladas: data.capacidade_toneladas != null ? Number(data.capacidade_toneladas) : undefined,
    altura_maxima_metros: data.altura_maxima_metros != null ? Number(data.altura_maxima_metros) : undefined,
    alcance_maximo_metros: data.alcance_maximo_metros != null ? Number(data.alcance_maximo_metros) : undefined,
    tipo_guindaste: data.tipo_guindaste,
    ano_fabricacao: data.ano_fabricacao != null ? Number(data.ano_fabricacao) : undefined,
    numero_serie: data.numero_serie,
    localizacao_atual: data.localizacao_atual,
    disponivel_para_aluguel: data.disponivel_para_aluguel ?? true,
    disponivel_para_venda: data.disponivel_para_venda ?? false,
    valor_diaria: data.valor_diaria != null ? Number(data.valor_diaria) : null,
    valor_hora_extra: data.valor_hora_extra != null ? Number(data.valor_hora_extra) : null,
    valor_venda: data.valor_venda != null ? Number(data.valor_venda) : null,
    status: data.status,
    // Provide timestamps in case Prisma client expects them (guard against schema/client mismatch)
    createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
    updatedAt: data.updatedAt ? new Date(data.updatedAt) : new Date(),
  };

  return prisma.guindastes.create({ data: payload });
};

export const updateGuindaste = async (id: string, updates: any) => {
  return prisma.guindastes.update({ where: { id }, data: updates });
};

export const getGuindasteId = async (id: string) => {
  return prisma.guindastes.findUnique({ where: { id } });
};
