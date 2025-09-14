import { Router } from "express";
import prometheusMetrics from "../controllers/metrics.controller";
const prometheusRouter = Router();

prometheusRouter.get("/", prometheusMetrics.metrics);

export default prometheusRouter;
