import pool from '../utils/pool';

export default class Album {
  id;
  title;
  year;
  genre;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.year = row.year;
    this.genre = row.genre;
  }

  static async insert({ title, year, genre }) {

    const{ rows } = await pool.query(
      `INSERT INTO albums (title, year, genre)
        VALUES ($1, $2, $3)
        RETURNING *`,
      [title, year, genre]
    );
    return new Album(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      'SELECT * FROM albums',

    );
    return rows.map(row => new Album(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM albums WHERE id = $1',
      [id]
    );
    return new Album(rows[0]);
  }

  static async update(album, id) {
    const { rows } = await pool.query(
      `UPDATE albums
      SET  title = $1,
           year = $2,
           genre = $3
      WHERE id = $4
      RETURNING *`,
      [album.title, album.year, album.genre, id]
    );
    return new Album(rows[0]);
  }
}
