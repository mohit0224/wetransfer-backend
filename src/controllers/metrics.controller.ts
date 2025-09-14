import client from "../configs/prometheus.config";
import asyncHandler from "../utils/asyncHandler.utils";

class PrometheusMetrics {
	metrics = asyncHandler(async (_, res) => {
		res.setHeader("content-Type", client.register.contentType);
		const metrics = await client.register.metrics();
		res.send(metrics);
	});
}

const prometheusMetrics = new PrometheusMetrics();
export default prometheusMetrics;
