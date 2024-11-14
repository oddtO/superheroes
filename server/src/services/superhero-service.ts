import { superheroesDb } from "../db/queries/superheroes";
class SuperheroService {
  async getSuperheroes() {
    const superheroes = await superheroesDb.getSuperheroes();
    return superheroes;
  }
}

export const superheroService = new SuperheroService();
