import express from 'express';
import cors from 'cors';
import routes from './src/routes/index';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
	console.log('Environment:');
	console.log(process.env.DATABASE);
});

export default app;
