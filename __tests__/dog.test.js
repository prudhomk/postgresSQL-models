import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Dog from '../lib/models/Dog.js';


describe('dog routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a dog via POST', async () => {
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

  it('finds all dogs via GET', async () => {

    const poochy = await Dog.insert({
      name: 'poochy',
      age: 24,
      weight: '140 lbs'
    });

    const fido = await Dog.insert({
      name: 'fido',
      age: 10,
      weight: '20 lbs'
    });

    const lassie = await Dog.insert({
      name: 'lassie',
      age: 6,
      weight: '18 lbs'
    });

    const res = await request(app).get('/api/v1/dogs');
    expect(res.body).toEqual([poochy, fido, lassie]);
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


  it('updates a dog by id via PUT', async () => {
    const dog = await Dog.insert({
      name: 'Bandit',
      age: 10,
      weight: '60 lbs'
    });

    dog.weight = '25 lbs';

    const res = await request(app).put(`/api/v1/dogs/${dog.id}`)
      .send(dog);
    expect(res.body).toEqual(dog);
  });

  it('deletes a dog by id via DELETE', async () => {
    const dog = await Dog.insert({
      name: 'Mittens',
      age: 9,
      weight: '3 lbs'
    });

    const res = await request(app).delete(`/api/v1/dogs/${dog.id}`)
      .send(dog);
    expect(res.body).toEqual(dog);
  });
});


