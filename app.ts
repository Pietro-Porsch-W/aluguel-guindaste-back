// app.ts
import express from 'express';
import cors from 'cors';
import routes from './src/routes/index';

const app = express();
 
app.use(cors());
app.use(express.json());
 
const prefix = process.env.VERCEL === '1' ? '/' : '/api';
app.use(prefix, routes);
 
app.get(process.env.VERCEL === '1' ? '/health' : '/api/health', (_req, res) =>
  res.json({ ok: true })
);
 
if (process.env.VERCEL !== '1') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

export default app;
