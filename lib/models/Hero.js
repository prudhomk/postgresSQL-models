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
}



