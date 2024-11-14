import pool from "../pool";
import { sql } from "@pgtyped/runtime";
import { IGetSuperheroesQuery } from "./superheroes.types";

class Superheroes {
  async getSuperheroes() {
    const getSuperheroes = sql<IGetSuperheroesQuery>`
      SELECT
        *
      FROM
        superheroes
    `;

    return getSuperheroes.run(undefined, pool);
  }
}

export const superheroesDb = new Superheroes();
