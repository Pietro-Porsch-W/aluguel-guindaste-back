// import { createRemoteJWKSet, jwtVerify, type JWTPayload } from 'jose';
// import { Request, Response, NextFunction } from 'express';

// const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
// const JWKS_URL = SUPABASE_URL ? `${SUPABASE_URL}/.well-known/jwks.json` : process.env.SUPABASE_JWKS_URL;

// let jwks: ReturnType<typeof createRemoteJWKSet> | null = null;
// if (JWKS_URL) jwks = createRemoteJWKSet(new URL(JWKS_URL));

// export async function verifySupabaseJwt(req: Request, res: Response, next: NextFunction) {
// 	try {
// 		const authHeader = req.headers['authorization'];
// 		const auth = String(authHeader ?? '');

// 		// If no Authorization header, mark user undefined and continue.
// 		// This allows public routes to work and lets route-level middlewares
// 		// (requireRole / requirePermission) decide how to respond.
// 		if (!authHeader) {
// 			console.debug('verifySupabaseJwt: no Authorization header present; proceeding with undefined user');
// 			(req as any).user = undefined;
// 			return next();
// 		}

// 		if (!auth.startsWith('Bearer ')) {
// 			console.warn('verifySupabaseJwt: Authorization header present but does not start with Bearer');
// 			return res.status(401).json({ error: 'Missing or invalid token' });
// 		}

// 		const token = auth.slice(7);
// 		if (!jwks) {
// 			console.error('JWKS not configured; SUPABASE_URL or SUPABASE_JWKS_URL is required');
// 			return res.status(500).json({ error: 'JWKS not configured' });
// 		}

// 		const { payload } = await jwtVerify(token, jwks, { algorithms: ['RS256'] });

// 		// Attach minimal user info to request from token claims
// 		(req as any).user = {
// 			id: (payload as any).sub,
// 			email: (payload as any).email,
// 			aud: (payload as any).aud,
// 			role: (payload as any).role,
// 		} as unknown;

// 		console.debug('verifySupabaseJwt: attached user from token', { id: (req as any).user?.id, role: (req as any).user?.role });
// 		return next();
// 	} catch (err) {
// 		console.error('JWT verification failed', err);
// 		return res.status(401).json({ error: 'Invalid token' });
// 	}
// }

// export default verifySupabaseJwt;
