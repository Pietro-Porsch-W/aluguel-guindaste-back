// app.ts
import express from 'express';
import cors from 'cors';
import routes from './src/routes/index';

const app = express();

app.use(cors()); // depois podemos restringir para o domínio do front
app.use(express.json());

app.use('/api', routes);

// só liga servidor quando NÃO estiver na Vercel
if (process.env.VERCEL !== '1') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    console.log('Environment:');
    console.log(process.env.DATABASE);
  });
}

export default app;
