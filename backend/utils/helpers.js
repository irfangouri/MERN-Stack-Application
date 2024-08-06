const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);
const JWT_SECRET = process.env.JWT_SECRET;

const getHashedPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  return hashedPassword;
}

const comparePassword = async (password, hashedPassword) => {
  const isPasswordValid = await bcrypt.compare(password, hashedPassword);
  return isPasswordValid;
}

const getAccessToken = (userData) => {
  const accessToken = jwt.sign(
    { userData },
    JWT_SECRET,
    { expiresIn: '24h' },
  );
  return accessToken;
}

const verifyAccessToken = async (accessToken) => {
  const data = jwt.verify(accessToken, JWT_SECRET);
  return data;
}

module.exports = {
  getHashedPassword,
  comparePassword,
  getAccessToken,
  verifyAccessToken,
};
