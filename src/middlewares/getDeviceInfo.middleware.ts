import { UAParser } from "ua-parser-js";
import asyncHandler from "../utils/asyncHandler.utils";
import logger from "../configs/logger.config";

const getDeviceInfo = asyncHandler((req, res, next) => {
    const parser = new UAParser(req.headers["user-agent"]);
    const result = parser.getResult();

    if (!result.device.type) {
        if (["macOS", "Windows", "Linux"].includes(result.os.name as string)) {
            (result.device as any).type = "desktop";
        }
    }

    const deviceInfo = {
        us: result.ua,
        browser: result.browser.name,
        browserVersion: result.browser.version,
        os: result.os.name,
        osVersion: result.os.version,
        deviceType: result.device.type,
        deviceModel: result.device.model,
        deviceVendor: result.device.vendor,
    };

    logger.defaultMeta = { deviceInfo };
    req.deviceInfo = deviceInfo;

    next();
});

export default getDeviceInfo;

