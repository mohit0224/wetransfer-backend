import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public");
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(".")[0];
        const uniqueSuffix = Date.now();
        const ext = path.extname(file.originalname).toLowerCase();

        cb(null, `${fileName}-${uniqueSuffix}${ext}`);
    },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const allowedExtensions = [".png", ".jpg", ".jpeg", ".webp"];
    const ext = path.extname(file.originalname).toLowerCase();
    const mimeType = file.mimetype;

    if (!allowedExtensions.includes(ext) || !mimeType.startsWith("image/")) {
        req.fileValidationError = "Invalid file type. Only image'(s) are allowed!";
        return cb(new Error(req.fileValidationError));
    }
    cb(null, true);
};

const fileSize = 5 * 1024 * 1024; // increase file size if needed

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize },
});

export default upload;

