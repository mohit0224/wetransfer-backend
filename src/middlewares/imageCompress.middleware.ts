import sharp from "sharp";
import asyncHandler from "../utils/asyncHandler.utils";
import path from "path";
import fs from "fs";
import { apiError } from "../utils/httpResponse.utils";

const imageCompress = asyncHandler(async (req, res, next) => {
    try {
        const files = req.file ? [req.file] : req.files ? Object.values(req.files).flat() : [];

        for (const file of files) {
            if (file.size > 0.5 * 1024 * 1024) {
                const newBuffer = await sharp(file.path)
                    .jpeg({ quality: 90 })
                    .png({ quality: 90 })
                    .webp({ quality: 90 })
                    .toBuffer();

                const newPath = path.join("public", file.filename);

                await fs.promises.writeFile(newPath, newBuffer);
            }
        }
        next();
    } catch (error) {
        throw new apiError(500, "Something went wrong during file processing!");
    }
});

export default imageCompress;

