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
      id: '1',
      name: 'Saitama',
      species: 'human',
      ability: 'one punch'
    });
  });

  it('finds all heroes via GET', async () => {

    const saitama = await Hero.insert({
      name: 'Saitama',
      species: 'human',
      ability: 'one punch'
    });

    const flash = await Hero.insert({
      name: 'Barry Allen',
      species: 'human',
      ability: 'speedster'
    });

    const anpanman = await Hero.insert({
      name: 'Anpanman',
      species: 'bread',
      ability: 'Friendship'
    });

    const res = await request(app).get('/api/v1/heroes');
    expect(res.body).toEqual([saitama, flash, anpanman]);
  });

  it('finds a hero by id via GET', async () => {
    const hero = await Hero.insert({
      name: 'Matter-Eater Lad',
      species: 'human',
      ability: 'eats everything'
    });

    const res = await request(app).get(`/api/v1/heroes/${hero.id}`);

    expect(res.body).toEqual(hero);
  });


});
