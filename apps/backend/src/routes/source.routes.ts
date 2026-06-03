import { Router } from "express";
import { SourceController } from "../controllers/source.controller";

const router = Router();

const sourceController = new SourceController();

router.get("/", sourceController.getSources);

export default router;