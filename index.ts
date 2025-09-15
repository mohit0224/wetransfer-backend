import app from "./src/app";
import envConfig from "./src/configs/env.config";
import logger from "./src/configs/logger.config";
import isProduction from "./src/utils/isProduction.utils";

const PORT = envConfig.PORT || 8080;
const message: string = isProduction
	? `Server is running at ${envConfig.BACKEND_URI}`
	: `Server is running on port http://localhost:${PORT}`;

(async () => {
	try {
		app.listen(PORT, () => {
			logger.info(message);
		});
	} catch (err) {
		logger.error("Error while starting server:", err);
		process.exit(1);
	}
})();
