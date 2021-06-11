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
  })

  .get('/api/v1/heroes/:id', async (req, res) => {
    try {
      const hero = await Hero.findById(req.params.id);
      res.send(hero);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .put('/api/v1/heroes/:id', async (req, res) => {
    try {
      const hero = await Hero.update(req.body, req.params.id);
      res.send(hero);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .delete('/api/v1/heroes/:id', async (req, res) => {
    try { 
      const hero = await Hero.delete(req.params.id);
      res.send(hero);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });
