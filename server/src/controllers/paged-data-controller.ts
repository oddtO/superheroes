import type { Request, Response, NextFunction } from "express";
import { superheroService } from "../services/superhero-service";
import { IPageParams } from "../schemas/page-params-schema";
class PagedDataController {
  async getPageCount(req: Request, res: Response, next: NextFunction) {
    try {
      const count = await superheroService.getPageCount();
      res.json({ pages: count });
    } catch (error) {
      next(error);
    }
  }
  async getPagedSuperheroes(
    req: Request<IPageParams>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { page } = req.params;
      const superheroes =
        await superheroService.getSuperheroesByPage(+page);
      res.send(superheroes);
    } catch (error) {
      next(error);
    }
  }
}
export const pagedDataController = new PagedDataController();
