const { validateUser } = require("../validations/userValidation");
const User = require('../models/user');
const { getHashedPassword } = require("../utils/helpers");

const registerUser = async ( userData ) => {
  const { name, email, password, confirmPassword } = userData;

  if (password !== confirmPassword) {
    return {
      error: "Confirm Password doesn't match with Password",
    };
  }

  const userDataValidation = validateUser(userData);
  if (userDataValidation?.error) {
    return {
      error: `User data is not validated, Please fill valid data. Error: ${userDataValidation.error}`,
    };
  }

  const user = await User.findOne({ email });
  if (user) {
    return {
      error: 'User already exist, Please use different email address',
    };
  }

  const hashedPassword = await getHashedPassword(password);
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });
  await newUser.save();

  return newUser;
}

const loginUser = ( userData ) => {
  const { email, password } = userData;
}

module.exports = {
  registerUser,
  loginUser,
};
