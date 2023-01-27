import express from 'express';
import dotenv from 'dotenv';
import gamesRouter from './src/controllers/games';

dotenv.config();
const app = express();
const port = process.env.PORT;
express.json();

app.use('/games', gamesRouter)

app.get('/', async (_, res) => {
  res.status(200);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
