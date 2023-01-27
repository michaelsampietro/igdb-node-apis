import express from 'express';
import { searchGame } from '../services/games/game';
import { listGames } from '../services/games/games';
const gamesRouter = express.Router();

gamesRouter.get('/', async (_, res) => {
  try {
    const data = await listGames();

    if (!data) {
      res.status(404).json({ error: 'No game found' });
      return;
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

gamesRouter.get('/:id', async (req, res) => {
  try {
    const data = await searchGame(Number(req.params.id));

    if (!data) {
      res.status(404).json({ error: 'No game found' });
      return;
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default gamesRouter;