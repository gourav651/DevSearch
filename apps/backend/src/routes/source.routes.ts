import { Router } from "express";
import { SourceController } from "../controllers/source.controller";
import { validate } from "../middlewares/validate.middleware";
import { sourceIdParamsSchema } from "../validators/source.validator";

const router = Router();

const sourceController = new SourceController();

router.get("/", sourceController.getSources);

router.get(
  "/:id",
  validate(sourceIdParamsSchema),
  sourceController.getSourceById
);

export default router;