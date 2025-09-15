import * as sourceMapSupport from "source-map-support";
import { createLogger, format, transports } from "winston";
import LokiTransport from "winston-loki";
import isProduction from "../utils/isProduction.utils";
const { combine, timestamp, json, colorize, printf } = format;

sourceMapSupport.install();

const consoleLogFormat = format.combine(
	colorize(),
	timestamp(),
	printf(({ level, message, timestamp, user }) => {
		return `${timestamp}${user ? ` user: ${user}` : ""} ${level}: ${message}`;
	})
);

const transporter: (
	| transports.ConsoleTransportInstance
	| transports.FileTransportInstance
	| any
)[] = [
	new transports.Console({
		format: consoleLogFormat,
	}),
];

if (isProduction) {
	transporter.push(
		new LokiTransport({
			host: "http://210.79.129.192:3100/",
		})
	);
}

if (!isProduction) {
	transporter.push(new transports.File({ filename: "logs/app.log" }));
	transporter.push(
		new transports.File({ filename: "logs/error.log", level: "error" })
	);
}

const logger = createLogger({
	level: "info",
	format: combine(timestamp(), json()),
	transports: transporter,
});

export default logger;
