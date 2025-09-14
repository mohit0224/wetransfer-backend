import logger from "./logger.config";

export const morganFormat = ":method :url :status :response-time ms";

export const morganFnc = {
    stream: {
        write: (message: string) => {
            const [method, url, status, responseTime] = message.split(" ");
            
            const logObject = {
                method,
                url,
                status,
                responseTime,
            };

            +logObject.status > 400 ? logger.error(JSON.stringify(logObject)) : logger.info(JSON.stringify(logObject));
        },
    },
};

