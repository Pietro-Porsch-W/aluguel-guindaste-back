import { prisma } from './prisma';

export const getAllPerfis = async () => {
  return prisma.perfis.findMany({
    orderBy: { dt_created: 'desc' },
    include: {
      permissoes: {
        include: { permissao: true },
      },
    },
  });
};

export const createPerfil = async (data: any) => {
  return prisma.perfis.create({ data });
};

export const updatePerfil = async (id: string, updates: any) => {
  return prisma.perfis.update({ where: { id }, data: updates });
};

export const setPerfilPermissoes = async (perfilId: string, permissaoIds: string[]) => {
  // remove existing
  await prisma.perfil_permissoes.deleteMany({ where: { perfilId } });

  if (!permissaoIds || permissaoIds.length === 0) return [];

  const items = permissaoIds.map(pid => ({ perfilId, permissaoId: pid }));
  return prisma.perfil_permissoes.createMany({ data: items });
};

export const getPerfilById = async (id: string) => {
  return prisma.perfis.findUnique({ where: { id }, include: { permissoes: { include: { permissao: true } } } });
};
