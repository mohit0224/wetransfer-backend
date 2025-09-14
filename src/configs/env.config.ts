import type { IEnvConfigType } from "../types/envConfig.types";

const envConfig: IEnvConfigType = {
	PORT: Number(process.env.PORT),
	BACKEND_URI: String(process.env.BACKEND_URI),
	CORS_ORIGIN: process.env.CORS_ORIGIN,
	MONGODB_URI: String(process.env.MONGODB_URI),
	MONGODB_DBNAME: String(process.env.MONGODB_DBNAME),
	BCRYPT_SALT: Number(process.env.BCRYPT_SALT),
	FRONTEND_URI: String(process.env.FRONTEND_URI),
	ACCESS_TOKEN: String(process.env.ACCESS_TOKEN),
	REFRESH_TOKEN: String(process.env.REFRESH_TOKEN),
	REDIS_HOST: String(process.env.REDIS_HOST),
	REDIS_PORT: Number(process.env.REDIS_PORT),
	COOKIE_SIGN: String(process.env.COOKIE_SIGN),
	SMTP_HOST: String(process.env.SMTP_HOST),
	SMTP_PORT: Number(process.env.SMTP_PORT),
	SMTP_USERNAME: String(process.env.SMTP_USERNAME),
	SMTP_PASS: String(process.env.SMTP_PASS),
	CLOUDINARY_CLOUD_NAME: String(process.env.CLOUDINARY_CLOUD_NAME),
	CLOUDINARY_API_KEY: String(process.env.CLOUDINARY_API_KEY),
	CLOUDINARY_API_SECRET: String(process.env.CLOUDINARY_API_SECRET),
};

export default envConfig;
