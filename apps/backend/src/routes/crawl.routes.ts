import { Router } from "express";
import { CrawlController } from "../controllers/crawl.controller";

const router = Router();

const crawlController =
  new CrawlController();

router.post(
  "/:sourceSlug",
  crawlController.startCrawl
);

export default router;