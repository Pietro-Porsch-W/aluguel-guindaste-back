import { Request, Response, NextFunction } from 'express';
import { prisma } from '../services/prisma';

export const requireRole = (role: string) => {
  console.log('requireRole middleware initialized with role:', role);
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    console.log('requireRole checking user:', user);
    if (!user || (user as any).role !== role) {
      return res.status(403).json({ error: 'Forbidden: insufficient role' });
    }
    next();
  };
};

export const requirePermission = (permissionName: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = (req as any).user;
      if (!user || !user.id) return res.status(401).json({ error: 'Unauthorized' });

      // If the JWT role indicates admin, grant all permissions
      if ((user as any).role === 'admin') {
        console.log('requirePermission: user has admin role in JWT, bypassing permission check');
        return next();
      }

      const u = await prisma.usuarios.findUnique({
        where: { id: String(user.id) },
        include: { perfis: { include: { permissoes: { include: { permissao: true } } } } },
      });
      if (!u) {
        console.warn('requirePermission: user not found in database', user.id);
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const permissoes = u?.perfis?.permissoes?.map((pp: any) => pp.permissao?.nome).filter(Boolean) || [];
      if (!permissoes.includes(permissionName)) {
        console.warn(`requirePermission: user ${user.id} missing permission ${permissionName}`, { permissoes });
        return res.status(403).json({ error: 'Forbidden: missing permission' });
      }
      next();
    } catch (err) {
      console.error('requirePermission error', err);
      res.status(500).json({ error: 'Internal error' });
    }
  };
};

export default requireRole;
