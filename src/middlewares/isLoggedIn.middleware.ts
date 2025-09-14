/// <reference path="../types/express.d.ts" />

import envConfig from "../config/envConfig";
import logger from "../config/logger.config";
import asyncHandler from "../utils/asyncHandler.utils";
import { apiError } from "../utils/httpResponse.utils";
import verifyToken from "../utils/jwt.utils";

const addUserIdToLogger = (userId: string, deviceInfo?: any) => {
    logger.defaultMeta = { user: userId, deviceInfo };
};

const isLoggedIn = asyncHandler((req, res, next) => {
    const accessToken = req.signedCookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!accessToken) {
        addUserIdToLogger("", req.deviceInfo);
        return next(new apiError(401, "Unauthorized request."));
    }
    const checkToken = verifyToken(accessToken, envConfig.ACCESS_TOKEN);

    if (!checkToken) {
        addUserIdToLogger("", req.deviceInfo);
        return next(new apiError(403, "Invalid access request."));
    }

    req.user = checkToken;
    addUserIdToLogger(checkToken.id, req.deviceInfo);
    return next();
});

export default isLoggedIn;

