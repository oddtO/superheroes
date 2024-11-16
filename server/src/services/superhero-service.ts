import { superheroesDb } from "../db/queries/superheroes";
import { IGetSuperheroAllDataResult } from "../db/queries/superheroes.types";
import { ApiError } from "../exceptions/api-error";
import { INewSuperhero, IUpdatedSuperhero } from "../types/types";
class SuperheroService {
  async getSuperheroes() {
    const superheroes = await superheroesDb.getSuperheroesWithTheirFirstImage();
    return superheroes;
  }

  async getSuperheroAllData(id: string) {
    const superhero = await superheroesDb.getSuperheroAllData(id);
    if (!superhero) {
      throw ApiError.NotFoundError();
    }
    return superhero;
  }

  async addSuperhero(superheroData: INewSuperhero) {
    const newSuperhero = await superheroesDb.addSuperhero(superheroData);
    return newSuperhero;
  }

  async updateSuperhero(superheroData: IUpdatedSuperhero) {
    const updatedSuperhero = await superheroesDb.updateSuperhero(superheroData);
    if (!updatedSuperhero) {
      throw ApiError.NotFoundError();
    }
    return updatedSuperhero;
  }
  async deleteSuperhero(id: string) {
    const deletedSuperhero = await superheroesDb.deleteSuperhero(id);
    if (!deletedSuperhero) {
      throw ApiError.NotFoundError();
    }
    return deletedSuperhero;
  }
  async getPageCount() {
    const count = await superheroesDb.getPageCount();
    return count;
  }

  async getSuperheroesByPage(page: number) {
    const superheroes = await superheroesDb.getByPages(page);

    if (!superheroes) {
      throw ApiError.NotFoundError();
    }

    return superheroes;
  }
}

export const superheroService = new SuperheroService();
