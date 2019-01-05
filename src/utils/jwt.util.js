const jwt = require('jsonwebtoken');

const EXPIRES_IN = '1d';

const generateJWT = (payload, sub = null) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    audience: process.env.APP_DOMAIN,
    expiresIn: EXPIRES_IN,
    issuer: process.env.APP_DOMAIN,
    subject: sub
  });
};

const verifyJWT = jwtToken => {
  return jwt.verify(jwtToken, process.env.JWT_SECRET_KEY, {
    audience: process.env.APP_DOMAIN,
    issuer: process.env.APP_DOMAIN,
    maxAge: EXPIRES_IN,
    ignoreExpiration: false
  });
};

module.exports = {
  generateJWT,
  verifyJWT
};
