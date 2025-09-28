import { prisma } from './prisma';
import bcrypt from 'bcryptjs';

const stripSenhaHash = (usuario: any) => {
  if (!usuario) return usuario;
  const { senha_hash, ...rest } = usuario;
  return rest;
};

export const getAllUsuarios = async () => {
  const rows = await prisma.usuarios.findMany({ orderBy: { dt_criacao: 'desc' } });
  return rows.map(stripSenhaHash);
};

export const createUsuario = async (data: any) => {
  // Map frontend perfil_id -> id_perfil
  const payload: any = { ...data };
  if (payload.perfil_id) {
    payload.id_perfil = payload.perfil_id;
    delete payload.perfil_id;
  }

  // Ensure senha_hash exists: generate temporary password and hash it
  if (!payload.senha_hash) {
    // generate a simple temporary password (admin should deliver to user)
    const temp = Math.random().toString(36).slice(-10);
    const hash = await bcrypt.hash(temp, 10);
    payload.senha_hash = hash;
    // attach tempPassword to returned object via a transient field (not stored)
    payload.__temp_password = temp;
  }

  // Only keep known fields for usuarios model
  const allowed: any = {
    email: payload.email,
    nome_completo: payload.nome_completo,
    id_perfil: payload.id_perfil,
    senha_hash: payload.senha_hash,
    ativo: typeof payload.ativo === 'boolean' ? payload.ativo : true,
  };

  const created = await prisma.usuarios.create({ data: allowed });
  const result = stripSenhaHash(created);
  // attach temp password if generated
  if (payload.__temp_password) (result as any).temp_password = payload.__temp_password;
  return result;
};

export const updateUsuario = async (id: string, updates: any) => {
  const payload: any = { ...updates };
  if (payload.perfil_id) {
    payload.id_perfil = payload.perfil_id;
    delete payload.perfil_id;
  }

  // Prevent updating senha_hash directly unless intentionally provided
  if (payload.senha) {
    payload.senha_hash = await bcrypt.hash(payload.senha, 10);
    delete payload.senha;
  }

  const allowed: any = {};
  if (payload.email) allowed.email = payload.email;
  if (payload.nome_completo) allowed.nome_completo = payload.nome_completo;
  if (typeof payload.ativo === 'boolean') allowed.ativo = payload.ativo;
  if (payload.id_perfil) allowed.id_perfil = payload.id_perfil;
  if (payload.senha_hash) allowed.senha_hash = payload.senha_hash;

  const updated = await prisma.usuarios.update({ where: { id }, data: allowed });
  return stripSenhaHash(updated);
};

export const getUsuarioId = async (id: string) => {
  const usuario = await prisma.usuarios.findUnique({ where: { id } });
  return stripSenhaHash(usuario);
};
