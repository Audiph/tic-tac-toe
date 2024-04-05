import express from 'express';
import {
  createGame,
  deleteGame,
  getAllGames,
  getGameById,
  updateGame,
} from '../controllers/games.server.controller';

const router = express.Router();

router.get('/games', getAllGames);
router.post('/game', createGame);
router.put('/game/:id', updateGame);
router.delete('/game/:id', deleteGame);
router.get('/:id', getGameById);

export default router;
