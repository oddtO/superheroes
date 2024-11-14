import { Router } from "express";
import { superheroController } from "../controllers/superhero-controller";

const router = Router();

router.get("/superheroes", superheroController.getSuperheroes);

export default router;
