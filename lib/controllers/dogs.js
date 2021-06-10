import { Router } from 'express';
import Dog from '../models/Dog';

export default Router()
  .post('/api/v1/dogs', async (req, res) => {
    try {
      console.log('hi', req.body);
      const dog = await Dog.insert(req.body);
      res.send(dog);
    } catch (err) {
      res.status(401).send(err);
    }
  })
//   .get('/api/v1/dogs/:id', (re))
// });

