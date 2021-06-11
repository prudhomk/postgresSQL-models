import { Router } from 'express';
import Sandwich from '../models/Sandwich';

export default Router()
  .post('/api/v1/sandwiches', async (req, res) => {
    try {
      const sandwich = await Sandwich.insert(req.body);
      res.send(sandwich);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });
