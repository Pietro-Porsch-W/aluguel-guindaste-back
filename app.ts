import express from 'express';
import cors from 'cors';
import routes from './src/routes';

const app = express();

app.use(cors({ origin: ['https://aluguel-guindaste-front-production.up.railway.app', 'http://localhost:8080'] }));
app.use(express.json());

const prefix = process.env.VERCEL === '1' ? '/' : '/api';
app.use(prefix, routes);

// health p/ ambos ambientes
app.get(process.env.VERCEL === '1' ? '/health' : '/api/health', (_req, res) => res.json({ ok: true }));

if (process.env.VERCEL !== '1') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server up on :${PORT}`));
}

export default app;
