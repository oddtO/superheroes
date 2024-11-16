import { Router } from "express";
import { superheroController } from "../controllers/superhero-controller";
import { uploadMiddleware } from "../middleware/upload-middleware";
import { validateBodyMiddleware } from "../middleware/validate-body-middleware";
import { SuperheroSchema } from "../schemas/superheroSchema";
import { UpdateSuperheroSchema } from "../schemas/updateSuperheroSchema";
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

export default router;
