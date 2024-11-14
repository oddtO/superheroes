import type { Request, Response, NextFunction } from "express";
import { superheroService } from "../services/superhero-service";
class SuperheroController {
  async getSuperheroes(req: Request, res: Response, next: NextFunction) {
    try {
      const superheroes = await superheroService.getSuperheroes();
      res.json(superheroes);
    } catch (error) {
      next(error);
    }
  }
}

export const superheroController = new SuperheroController();
