import pool from '../utils/pool';

export default class Sandwich {
  id;
  name;
  ingredients;
  rating;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.ingredients = row.ingredients;
    this.rating = row.rating;
  }

  static async insert({ name, ingredients, rating }) {

    const{ rows } = await pool.query(
      `INSERT INTO sandwiches (name, ingredients, rating)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [name, ingredients, rating]
    );

    return new Sandwich(rows[0]);
  }
}
