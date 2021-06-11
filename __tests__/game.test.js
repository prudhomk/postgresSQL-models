import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Game from '../lib/models/Game.js';

describe('game routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a game via POST', async () => {
    const res = await request(app)
      .post('/api/v1/games')
      .send({ title: 'Super Mario 64', rating: 'E', price: 59.99, console: 'Nintendo 64' });

    expect(res.body).toEqual({
      id: '1',
      title: 'Super Mario 64',
      rating: 'E',
      price: 59.99,
      console: 'Nintendo 64'
    });
  });
});
