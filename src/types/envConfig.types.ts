export interface IEnvConfigType {
    PORT: number;
    BACKEND_URI: string;
    CORS_ORIGIN: unknown;
    MONGODB_URI: string;
    MONGODB_DBNAME: string;
    BCRYPT_SALT: number;
    FRONTEND_URI: string;
    ACCESS_TOKEN: string;
    REFRESH_TOKEN: string;
    REDIS_HOST: string;
    REDIS_PORT: number;
    COOKIE_SIGN: string;
    SMTP_HOST: string;
    SMTP_PORT: number;
    SMTP_USERNAME: string;
    SMTP_PASS: string;
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
}

