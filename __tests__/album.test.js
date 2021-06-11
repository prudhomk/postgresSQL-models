import pool from '../lib/utils/pool.js';
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

  it('finds all albums via GET', async () => {

    const vulfpeck = await Album.insert({
      title: 'Thrill of The Arts',
      year: 2015,
      genre: 'funk'
    });

    const sparks = await Album.insert({
      title: 'Kimono my House',
      year: 1974,
      genre: 'pop'
    });

    const beatles = await Album.insert({
      title: 'Revolver',
      year: 1966,
      genre: 'rock'
    });

    const res = await request(app).get('/api/v1/albums');
    expect(res.body).toEqual([vulfpeck, sparks, beatles]);
  });

  it('finds an album by id via GET', async () => {
    const album = await Album.insert({
      title: 'Kimono my House',
      year: 1974,
      genre: 'pop'
    });

    const res = await request(app).get(`/api/v1/albums/${album.id}`);

    expect(res.body).toEqual(album);
  });

  it('updates an album by id via PUT', async () => {
    const album = await Album.insert({
      title: 'Eldorado',
      year: 1974,
      genre: 'hip-hop'
    });

    album.genre = 'rock';

    const res = await request(app).put(`/api/v1/albums/${album.id}`)
      .send(album);
    expect(res.body).toEqual(album);
  });

  it('deletes an album by id via DELETE', async () => {
    const album = await Album.insert({
      title: 'Sgt. Puppers Lonely Barks Pup Band',
      year: 1967,
      genre: 'dog'
    });

    const res = await request(app).delete(`/api/v1/albums/${album.id}`)
      .send(album);
    expect(res.body).toEqual(album);
  });
});
