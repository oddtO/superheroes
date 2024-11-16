import type { Request, Response, NextFunction } from "express";
import { superheroService } from "../services/superhero-service";
import { ISuperhero } from "../schemas/superhero-schema";
import { IFile, INewSuperhero, IUpdatedSuperhero } from "../types/types";
import { createDataUrl } from "../utils/create-data-url";
import { UpdateSuperhero } from "../schemas/update-superhero-schema";
class SuperheroController {
  async getSuperheroes(req: Request, res: Response, next: NextFunction) {
    try {
      const superheroes = await superheroService.getSuperheroes();
      res.send(superheroes);
    } catch (error) {
      next(error);
    }
  }

  async getSuperhero(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      const superhero = await superheroService.getSuperheroAllData(id);
      res.json(superhero);
    } catch (error) {
      next(error);
    }
  }

  async addSuperhero(
    req: Request<object, object, ISuperhero>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const files = req.files as IFile[];

      const imagesInfo = {
        image_filenames: [] as string[],
        image_types: [] as string[],
        images_b64: [] as string[],
      };
      files.forEach((file) => {
        imagesInfo.image_filenames.push(file.originalname);
        imagesInfo.image_types.push(file.mimetype);
        imagesInfo.images_b64.push(
          createDataUrl(file.mimetype, file.buffer.toString("base64")),
        );
      });
      const newSuperheroParam = {
        ...req.body,
        ...imagesInfo,
      } as INewSuperhero;
      const newSuperhero =
        await superheroService.addSuperhero(newSuperheroParam);

      res.status(201).json(newSuperhero);
    } catch (error) {
      next(error);
    }
  }

  async updateSuperhero(
    req: Request<{ id: string }, object, UpdateSuperhero>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      const files = req.files as IFile[];

      const imagesInfo = {
        image_filenames: [] as string[],
        image_types: [] as string[],
        images_b64: [] as string[],
      };
      files.forEach((file) => {
        imagesInfo.image_filenames.push(file.originalname);
        imagesInfo.image_types.push(file.mimetype);
        imagesInfo.images_b64.push(
          createDataUrl(file.mimetype, file.buffer.toString("base64")),
        );
      });
      const newSuperheroParam = {
        ...req.body,
        ...imagesInfo,
        id,
      } as IUpdatedSuperhero;

      const newSuperhero =
        await superheroService.updateSuperhero(newSuperheroParam);

      res.json(newSuperhero);
    } catch (error) {
      next(error);
    }
  }
  async deleteSuperhero(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      await superheroService.deleteSuperhero(id);
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
}

export const superheroController = new SuperheroController();
