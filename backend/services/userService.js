const User = require('../models/user');

const { validateUser } = require('../validations/userValidation');
const { getHashedPassword, comparePassword, getAccessToken, verifyAccessToken } = require('../utils/helpers');

const registerUser = async ( userData ) => {
  const { name, email, password, confirmPassword } = userData;

  if (
    !name
    || !email
    || !password
    || !confirmPassword
  ) {
    return {
      error: 'Please fill all the fields',
    };
  }

  if (password !== confirmPassword) {
    return {
      error: `Confirm Password doesn't match with Password`,
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

const loginUser = async ( userData ) => {
  const { email, password } = userData;

  if (
    !email
    || !password
  ) {
    return {
      error: 'Please fill all the fields',
    };
  }

  const userDataValidation = validateUser(userData);
  if (userDataValidation?.error) {
    return {
      error: `User data is not validated, Please fill valid data. Error: ${userDataValidation.error}`,
    };
  }

  const user = await User.findOne({ email });
  if (!user) {
    return {
      error: 'User not found',
    };
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    return {
      error: 'Wrong Password',
    };
  }

  const accessToken = getAccessToken(user);
  return {
    id: user._id.toString(),
    accessToken,
  };
}

const getUser = async ( userId ) => {
  const user = await User.findById(userId);
  if (!user) {
    return {
      error: 'User not found',
    };
  }

  return {
    id: userId,
    name: user.name,
    email: user.email,
  };
}

const resetPassword = async (userId, userData) => {
  const { password, confirmPassword } = userData;

  const user = await User.findById(userId);
  if (!user) {
    return {
      error: 'User not found',
    };
  }

  if (password !== confirmPassword) {
    return {
      error: 'Confirm Password and Password does not match',
    };
  }

  const hashedPassword = await getHashedPassword(password);

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { password: hashedPassword },
    { new: true },
  );
  return updatedUser;
}

module.exports = {
  registerUser,
  loginUser,
  getUser,
  resetPassword,
};
