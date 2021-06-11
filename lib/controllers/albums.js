import { Router } from 'express';
import Album from '../models/Album';

export default Router()
  .post('/api/v1/albums', async (req, res) => {
    try {
      const album = await Album.insert(req.body);
      res.send(album);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('/api/v1/albums', async (req, res) => {
    try {
      const album = await Album.findAll();
      res.send(album);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('/api/v1/albums/:id', async (req, res) => {
    try { 
      const album = await Album.findById(req.params.id);
      res.send(album);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .put('/api/v1/albums/:id', async (req, res) => {
    try {
      const album = await Album.update(req.body, req.params.id);
      res.send(album);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .delete('/api/v1/albums/:id', async (req, res) => {
    try {
      const album = await Album.delete(req.params.id);
      res.send(album);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });
