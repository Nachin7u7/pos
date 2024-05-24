require('dotenv').config();

const jwtConfig = {
    tokenSecret: process.env.JWT_TOKEN_SECRET,
    tokenExpireIn: process.env.JWT_TOKEN_EXPIRES_IN || '1h',
    accessTokenExpireIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || '1h',
    refreshTokenExpireIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || '30d',
};