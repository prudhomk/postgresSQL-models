import pool from '../lib/utils/pools.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Album from '../lib/models/Album.js';

describe('album routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a album via POST', async () => {
    const res = await request(app)
      .post('/api/v1/albums')
      .send({ title: 'Thrill of The Arts', year: 2015, genre: 'funk' });

    expect(res.body).toEqual({
      id: '1',
      title: 'Thrill of The Arts',
      year: 2015,
      genre: 'funk'
    });
  });
});
