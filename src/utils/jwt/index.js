const jwt = require("jsonwebtoken");
const { TOKEN_EXPIRATION_TIME_IN_HOURS } = require("../constants");
const secretkey = process.env.JWT_SECRET_KEY;

function generateJwtToken({ user }) {
  const payload = {
    id: user.id,
    email: user.email,
  };
  const token = jwt.sign(payload, secretkey, {
    expiresIn: TOKEN_EXPIRATION_TIME_IN_HOURS,
  });
  return token;
}

function verifyJwtToken({ token }) {
  const decoded = jwt.verify(token, secretkey);
  return decoded;
}

module.exports = {
  generateJwtToken,
  verifyJwtToken,
};
