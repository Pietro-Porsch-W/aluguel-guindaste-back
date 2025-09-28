import { prisma } from './prisma';

export const getAllPermissoes = async () => {
  return prisma.permissao.findMany({ orderBy: { nome: 'asc' } });
};

export const createPermissao = async (data: any) => {
  return prisma.permissao.create({ data });
};

export const updatePermissao = async (id: string, updates: any) => {
  return prisma.permissao.update({ where: { id }, data: updates });
};
