const bcrypt = require('bcrypt');

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);

const getHashedPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  return hashedPassword;
}

const comparePassword = async (password, hashedPassword) => {

}

const getAccessToken = async (userData) => {

}

const verifyAccessToken = async (accessToken) => {

}

module.exports = {
  getHashedPassword,
  comparePassword,
  getAccessToken,
  verifyAccessToken,
};
