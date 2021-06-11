import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Hero from '../lib/models/Hero.js';

describe('hero routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a hero via POST', async () => {
    const res = await request(app)
      .post('/api/v1/heroes')
      .send({ name: 'Saitama', species: 'human', ability: 'one punch' });

    expect(res.body).toEqual({
      name: 'Saitama',
      species: 'human',
      ability: 'one punch'
    });
  });



});
