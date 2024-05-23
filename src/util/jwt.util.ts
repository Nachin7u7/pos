import jwt from 'jsonwebtoken';
//TODO:  uncomment after creating config file
// import { config } from '../config';

// const tokenSecret = config.jwt.tokenSecret || 'SUPERDUPERTOKEN';
// const tokenExpireIn = config.jwt.tokenExpireIn || '1h';
// const refreshTokenExpireIn = config.jwt.refreshTokenExpireIn || '7d';
const tokenSecret = 'SUPERDUPERTOKEN';
const tokenExpireIn = '1h';
const refreshTokenExpireIn = '7d';

/**
 * Generates a JWT for a user.
 * @param user The user object for whom to generate the token.
 * @returns The generated JWT token.
 */
const generateToken = (user: any): string => {
  return jwt.sign(
    { id: user._id, email: user.email, username: user.username, type: user.userType },
    tokenSecret,
    { expiresIn: tokenExpireIn }
  );
};

/**
 * Generates a Refresh JWT for a user.
 * @param user The user object for whom to generate the token.
 * @returns The generated JWT token.
 */
const generateRefreshToken = (user: any): string => {
  return jwt.sign(
    { id: user._id, email: user.email, username: user.username, type: user.userType },
    tokenSecret,
    { expiresIn: refreshTokenExpireIn }
  );
};

/**
 * Generates an Access JWT for a user.
 * @param user The user object for whom to generate the token.
 * @returns The generated JWT token.
 */
const generateAccessToken = (user: any): string => {
  return jwt.sign(
    { id: user._id, email: user.email, username: user.username, type: user.userType },
    tokenSecret,
    { expiresIn: tokenExpireIn }
  );
};

/**
 * Verifies a JWT token and returns the decoded payload if valid.
 * @param token The JWT token to verify.
 * @returns A promise that resolves with the decoded token payload if valid, or rejects if not valid.
 */
const verifyToken = (token: string): Promise<object | string> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, tokenSecret, (err, decoded: any) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded);
    });
  });
};

export { generateToken, verifyToken, generateAccessToken, generateRefreshToken };
