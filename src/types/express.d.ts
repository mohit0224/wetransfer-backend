import * as express from "express";

export interface IMulterFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
}

declare global {
    namespace Express {
        interface Request {
            user?: T;
            fileValidationError?: T;
            file: IMulterFile;
            deviceInfo?: T;
        }
    }
}

export {};

