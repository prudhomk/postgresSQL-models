import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Dog from '../lib/models/Dog.js';

describe('dog routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it.only('creates a dog via POST', async () => {
    const res = await request(app)
      .post('/api/v1/dogs')
      .send({ name: 'poochy', age: 24, weight: '140 lbs' });
      
    expect(res.body).toEqual({
      id: '1',
      name: 'poochy',
      age: 24,
      weight: '140 lbs'
    });
  });

  it('finds a dog by id via GET', async () => {
    const dog = await Dog.insert({
      name: 'fido',
      age: 6,
      weight: '20 lbs'
    });

    const res = await request(app).get(`/api/v1/dogs/${dog.id}`);

    expect(res.body).toEqual(dog);
  });
});
