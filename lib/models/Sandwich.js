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

  static async findAll() {
    const { rows } = await pool.query(
      'SELECT * FROM sandwiches',

    );
    return rows.map(row => new Sandwich(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM sandwiches WHERE id = $1',
      [id]
    );
    return new Sandwich(rows[0]);
  }
  
  static async update(sandwich, id) {
    const { rows } = await pool.query(
      `UPDATE sandwiches
        SET name = $1,
            ingredients = $2,
            rating = $3
        WHERE id = $4
        RETURNING *`,
      [sandwich.name, sandwich.ingredients, sandwich.rating, id]
    );
    return new Sandwich(rows[0]);
  }
}
