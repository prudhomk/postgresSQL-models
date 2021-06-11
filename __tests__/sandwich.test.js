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

  it('finds all sanwiches via GET', async () => {
    
    const BLT = await Sandwich.insert({
      name: 'BLT',
      ingredients: 'bacon, lettuce, tomato, mayo',
      rating: '5 Stars'
    });
    
    const gyro = await Sandwich.insert({
      name: 'Gyro',
      ingredients: 'lamb, lettuce, tomato, tsatziki, pickles, onion',
      rating: '5 Stars'
    });

    const cheese = await Sandwich.insert({
      name: 'Grilled Cheese',
      ingredients: 'cheese',
      rating: '5 Stars'
    });

    const res = await request(app).get('/api/v1/sandwiches');
    expect(res.body).toEqual([BLT, gyro, cheese]);
  });
});
