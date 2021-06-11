import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Sandwich from '../lib/models/Sandwich.js';

describe('sandwich routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a sandwich via POST', async () => {
    const res = await request(app)
      .post('/api/v1/sandwiches')
      .send({ name: 'BLT', ingredients: 'bacon, lettuce, tomato, mayo', rating: '5 Stars' });
  
    expect(res.body).toEqual({
      id: '1',
      name: 'BLT',
      ingredients: 'bacon, lettuce, tomato, mayo',
      rating: '5 Stars'
    });
  });
});
