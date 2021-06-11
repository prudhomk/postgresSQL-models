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

  static async findAll() {
    const { rows } = await pool.query(
      'SELECT * FROM games',

    );
    return rows.map(row => new Game(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM games WHERE id = $1',
      [id]
    );
    return new Game(rows[0]);
  }

  static async update(game, id) {
    const { rows } = await pool.query(
      `UPDATE games
       SET title = $1,
           rating = $2,
           price = $3,
           console = $4
       WHERE id = $5
       RETURNING *`,
      [game.title, game.rating, game.price, game.console, id]
    );
    return new Game(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `DELETE FROM games
       WHERE id = $1
       RETURNING *`,
      [id]
    );
    return new Game(rows[0]);
  }
}
