import { Router } from 'express';
import Game from '../models/Game';

export default Router()
  .post('/api/v1/games', async (req, res) => {
    try {
      const game = await Game.insert(req.body);
      res.send(game);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('/api/v1/games', async (req, res) => {
    try {
      const game = await Game.findAll(req.body);
      res.send(game);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('/api/v1/games/:id', async (req, res) => {
    try {
      const game = await Game.findById(req.params.id);
      res.send(game);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .put('/api/v1/games/:id', async (req, res) => {
    try {
      const game = await Game.update(req.body, req.params.id);
      res.send(game);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

