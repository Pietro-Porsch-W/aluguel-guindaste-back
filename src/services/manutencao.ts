import { prisma } from './prisma';

export const getAllManutencoes = async () => {
  return prisma.manutencoes.findMany({ orderBy: { dt_created: 'desc' } });
};

export const createManutencao = async (data: any) => {
  return prisma.manutencoes.create({ data });
};

export const updateManutencao = async (id: string, updates: any) => {
  return prisma.manutencoes.update({ where: { id }, data: updates });
};

export const getManutencaoId = async (id: string) => {
  return prisma.manutencoes.findUnique({ where: { id } });
};
