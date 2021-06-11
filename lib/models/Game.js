import pool from '../utils/pool';

export default class Game {
  id;
  title;
  rating;
  price;
  console;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.rating = row.rating;
    this.price = row.price;
    this.console = row.console;
  }

  static async insert({ title, rating, price, console }) {

    const{ rows } = await pool.query(
      `INSERT INTO games (title, rating, price, console)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [title, rating, price, console]
    );

    return new Game(rows[0]);
  }
}
