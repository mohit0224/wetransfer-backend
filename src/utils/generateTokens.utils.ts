interface JwtTokens {
	accessToken: string;
	refreshToken: string;
}

const generateTokens = async (user: any): Promise<JwtTokens> => {
	const accessToken = user.generateAccessToken();
	const refreshToken = user.generateRefreshToken();

	user.refreshToken = refreshToken;
	await user.save({ validateBeforeSave: false });

	return { accessToken, refreshToken };
};

export default generateTokens;
