import type { Request, Response } from "express";
import client from "../configs/prometheus.config";
import responseTime from "response-time";

const reqResTime = new client.Histogram({
	name: "http_express_req_res_time",
	help: "this tells how much time taken by req and res",
	labelNames: ["method", "route", "status_code"],
	buckets: [1, 50, 100, 200, 300, 500, 800, 1000, 2000],
});

const apiReqResTime = responseTime((req: Request, res: Response, time) => {
	reqResTime
		.labels({
			method: req.method,
			route: req.originalUrl || req.url,
			status_code: res.statusCode,
		})
		.observe(time);
});

export default apiReqResTime;
