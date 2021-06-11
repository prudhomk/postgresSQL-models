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

  it('finds a sandwich by id via GET', async () => {
    const sandwich = await Sandwich.insert({
      name: 'Muffuletta',
      ingredients: 'olive salad, salami, ham, swiss cheese, provolone, mortadella',
      rating: '5 Stars'
    });

    const res = await request(app).get(`/api/v1/sandwiches/${sandwich.id}`);

    expect(res.body).toEqual(sandwich);
  });

  it('updates a sandwich by id via PUT', async () => {
    const sandwich = await Sandwich.insert({
      name: 'Croque-monsieur',
      ingredients: 'brioche, ham, gruyere cheese, bechamel sauce, fried egg',
      rating: '5 Stars'
    });

    sandwich.name = 'Croque-madame';

    const res = await request(app).put(`/api/v1/sandwiches/${sandwich.id}`)
      .send(sandwich);
    expect(res.body).toEqual(sandwich);
  });
});
