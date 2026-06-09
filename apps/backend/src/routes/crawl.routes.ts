import { Router } from "express";
import { CrawlController } from "../controllers/crawl.controller";
import { validate } from "../middlewares/validate.middleware";
import { crawlParamsSchema } from "../validators/crawl.validator";

const router = Router();

const crawlController =
  new CrawlController();

router.post(
  "/:sourceSlug",
  validate(crawlParamsSchema),
  crawlController.startCrawl
);

export default router;