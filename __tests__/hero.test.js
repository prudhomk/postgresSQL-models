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

  it('updates a hero by id via PUT', async () => {
    const hero = await Hero.insert({
      name: 'Rocket Raccoon',
      species: 'trash panda',
      ability: 'weapons expert'
    });

    hero.species = 'raccoon';

    const res = await request(app).put(`/api/v1/heroes/${hero.id}`)
      .send(hero);
    expect(res.body).toEqual(hero);
  });

  it('deletes a hero by id via DELETE', async () => {
    const hero = await Hero.insert({
      name: 'General Zod',
      species: 'Kryptonian',
      ability: 'Strength, flight, heat-vision, speed'
    });

    const res = await request(app).delete(`/api/v1/heroes/${hero.id}`)
      .send(hero);
    expect(res.body).toEqual(hero);
  });

});
