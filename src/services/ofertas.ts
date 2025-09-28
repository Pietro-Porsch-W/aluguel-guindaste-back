import { prisma } from './prisma';

export const getAllOfertas = async () => {
  return prisma.ofertas_venda.findMany({ orderBy: { createdAt: 'desc' } });
};

export const createOferta = async (data: any) => {
  return prisma.ofertas_venda.create({ data });
};

export const updateOferta = async (id: string, updates: any) => {
  return prisma.ofertas_venda.update({ where: { id }, data: updates });
};

export const getOfertaId = async (id: string) => {
  return prisma.ofertas_venda.findUnique({ where: { id } });
};
