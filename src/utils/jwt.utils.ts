import jwt, { type JwtPayload } from "jsonwebtoken";
import { apiError } from "./httpResponse.utils";

interface TokenPayload extends JwtPayload {
	id: string;
}

const verifyToken = (token: string, secret: string): TokenPayload | null => {
	try {
		return jwt.verify(token, secret) as TokenPayload;
	} catch (err: unknown) {
		if (err instanceof Error) {
			throw new apiError(
				400,
				`Something went wrong, while verifying token. :: ${err.message}`
			);
		} else {
			throw new apiError(400, "Something went wrong, while verifying token.");
		}
	}
};

export default verifyToken;
