import { Router } from 'express';

import Hero from '../models/Hero';

export default Router()
  .post('/api/v1/heroes', async (req, res) => {
    try {
      const hero = await Hero.insert(req.body);
      res.send(hero);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('/api/v1/heroes', async (req, res) => {
    try {
      const hero = await Hero.findAll();
      res.send(hero);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });
