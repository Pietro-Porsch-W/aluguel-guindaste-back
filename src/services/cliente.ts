import { prisma } from './prisma';

export const getAllClientes = async () => {
	return prisma.clientes.findMany({ orderBy: { dt_cadastro: 'desc' } });
};

export const createCliente = async (data: {
	nome: string;
	tipo_cliente: string;
	documento: string;
	email: string;
	telefone: string;
	endereco: string;
	ativo?: boolean;
	usuarioId?: string;
}) => {
	return prisma.clientes.create({ data: data as any });
};

export const updateCliente = async (id: string, updates: Record<string, any>) => {
	return prisma.clientes.update({ where: { id }, data: updates });
};

export const getClienteId = async (id: string) => {
	return prisma.clientes.findUnique({ where: { id } });
};
