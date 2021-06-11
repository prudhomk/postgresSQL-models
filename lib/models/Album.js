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
}
