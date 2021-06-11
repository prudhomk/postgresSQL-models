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

  it('finds all games via GET', async () => {

    const mario = await Game.insert({
      title: 'Super Mario 64',
      rating: 'E',
      price: 59.99,
      console: 'Nintendo 64'
    });

    const zelda = await Game.insert({
      title: 'Legend of Zelda',
      rating: 'E',
      price: 59.99,
      console: 'Nintendo Entertainment System'
    });

    const huntdown = await Game.insert({
      title: 'Huntdown',
      rating: 'T',
      price: 19.99,
      console: 'All'
    });

    const res = await request(app).get('/api/v1/games');
    expect(res.body).toEqual([mario, zelda, huntdown]);
  });

  it('finds a game by id via GET', async () => {
    const game = await Game.insert({
      title: 'Huntdown',
      rating: 'T',
      price: 19.99,
      console: 'All'
    });

    const res = await request(app).get(`/api/v1/games/${game.id}`);

    expect(res.body).toEqual(game);
  });

  it('updates a game by id via PUT', async () => {
    const game = await Game.insert({
      title: 'Metal Slug',
      rating: 'T',
      price: 19.99,
      console: 'All'
    });

    game.title = 'Metal Slug Anthology';

    const res = await request(app).put(`/api/v1/games/${game.id}`)
      .send(game);
    expect(res.body).toEqual(game);
  });
});
