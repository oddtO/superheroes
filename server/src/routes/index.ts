import { Router } from "express";
import { superheroController } from "../controllers/superhero-controller";
import { uploadMiddleware } from "../middleware/upload-middleware";
import { validateBodyMiddleware } from "../middleware/validate-body-middleware";
import { validateParamsMiddleware } from "../middleware/validate-params-middleware";
import { SuperheroSchema } from "../schemas/superhero-schema";
import { UpdateSuperheroSchema } from "../schemas/update-superhero-schema";
import { PageParamsSchema } from "../schemas/page-params-schema";
import { pagedDataController } from "../controllers/paged-data-controller";
const MAX_FILES = 12;
const router = Router();

router.get("/superheroes", superheroController.getSuperheroes);
router.get("/superhero/:id", superheroController.getSuperhero);
router.post(
  "/superheroes",
  uploadMiddleware.array("images", MAX_FILES),
  validateBodyMiddleware(SuperheroSchema),
  superheroController.addSuperhero,
);

router.patch(
  "/superhero/:id",
  uploadMiddleware.array("images", MAX_FILES),
  validateBodyMiddleware(UpdateSuperheroSchema),
  superheroController.updateSuperhero,
);

router.delete("/superhero/:id", superheroController.deleteSuperhero);

router.get("/paged", pagedDataController.getPageCount);
router.get(
  "/paged/:page",
  validateParamsMiddleware(PageParamsSchema),
  pagedDataController.getPagedSuperheroes,
);
export default router;
