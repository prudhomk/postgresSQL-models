import pool from '../utils/pool';

export default class Hero {
  id;
  name;
  species;
  ability;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.species = row.species;
    this.ability = row.ability;
  }

  static async insert({ name, species, ability }) {

    const { rows } = await pool.query(
      `INSERT INTO heroes (name, species, ability)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name, species, ability]
    );

    return new Hero(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      'SELECT * FROM heroes',

    );
    return rows.map(row => new Hero(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM heroes WHERE id = $1',
      [id]
    );
    return new Hero(rows[0]);
  }

  static async update(hero, id) {
    const { rows } = await pool.query(
      `UPDATE heroes
       SET name = $1,
           species = $2,
           ability = $3
       WHERE id = $4
       RETURNING *`,
      [hero.name, hero.species, hero.ability, id]
    );
    return new Hero(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `DELETE FROM heroes
       WHERE id = $1
       RETURNING *`,
      [id]
    );
    return new Hero(rows[0]);
  }
}



