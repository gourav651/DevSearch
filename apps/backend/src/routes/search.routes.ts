import { Router } from "express";
import { SearchController } from "../controllers/search.controller";
import { validate } from "../middlewares/validate.middleware";
import { searchQuerySchema } from "../validators/search.validator";

const router = Router();

const searchController = new SearchController();

router.get(
  "/",
  validate(searchQuerySchema),
  searchController.search
);

export default router;