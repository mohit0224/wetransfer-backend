import express, { type Application } from "express";
import hpp from "hpp";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";

// note: import all config files, middlewares or utils.
import hppConfig from "./configs/hpp.config";
import helmetConfig from "./configs/helmet.config";
import { morganFnc, morganFormat } from "./configs/morgan.config";
import envConfig from "./configs/env.config";
import corsConfig from "./configs/cors.config";
import rateLimiter from "./middlewares/rateLimiter.middleware";
import getDeviceInfo from "./middlewares/getDeviceInfo.middleware";
import filterQuery from "./middlewares/filterQuery.middleware";
import isHttps from "./middlewares/isHttps.middleware";
import csrfProtection from "./middlewares/csrf.middleware";
import notFoundRoute from "./middlewares/notFoundRoute";
import globalErrorHandler from "./middlewares/globalErrorHandler.middleware";
import asyncHandler from "./utils/asyncHandler.utils";
import { apiResponse } from "./utils/httpResponse.utils";

// note: prometheus config
import client from "./configs/prometheus.config";
import apiReqResTime from "./middlewares/apiReqResTime.middleware";

// note: import all routes
import csrfRouter from "./routes/csrf.routes";
import healthRouter from "./routes/health.routes";
import prometheusRouter from "./routes/prometheus.routes";

const app: Application = express();
const collectDefaultMetric = client.collectDefaultMetrics;
collectDefaultMetric({ register: client.register });

app.set("trust proxy", 1);
app.use(getDeviceInfo);
app.use(filterQuery);
app.use(hpp(hppConfig));
app.use(isHttps);
app.use(cors(corsConfig));
app.use(helmet(helmetConfig));
app.use(rateLimiter());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
app.use(morgan(morganFormat, morganFnc));
app.use(cookieParser(envConfig.COOKIE_SIGN));
// app.use(csrfProtection); // todo: enable while integration
app.use(compression());
app.use(apiReqResTime);

app.get(
	"/",
	asyncHandler((_, res) => {
		res.status(200).json(new apiResponse(200, "Server is running."));
	})
);

app.get("/metrics", prometheusRouter);
app.use("/api/v1/csrf-token", csrfRouter);
app.use("/api/v1/health", healthRouter);

app.use(notFoundRoute);
app.use(globalErrorHandler);
export default app;
