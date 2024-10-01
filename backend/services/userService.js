const User = require('../models/user');

const { validateUser } = require('../validations/userValidation');
const { getHashedPassword, comparePassword, getAccessToken, verifyAccessToken } = require('../utils/helpers');
const sendMail = require('./mailService');

const registerUser = async ( userData ) => {
  try {
    const {
      name,
      email,
      password
    } = userData;

    const userDataValidation = validateUser(userData);
    if (userDataValidation?.error) {
      return {
        error: `Error: ${userDataValidation.error}`,
      };
    }
  
    const user = await User.findOne({ email });
    if (user) {
      return {
        error: 'User already exist, Please use different email address or login',
      };
    }
  
    const hashedPassword = await getHashedPassword(password);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
  
    await sendMail();
    return {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    };
  } catch (error) {
    return {
      error: error,
    };
  }
}

const loginUser = async ( userData ) => {
  try {
    const {
      email,
      password
    } = userData;

    const userDataValidation = validateUser(userData);
    if (userDataValidation?.error) {
      return {
        error: `Error: ${userDataValidation.error}`,
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
      id: user._id,
      accessToken,
    };
  } catch (error) {
    return {
      error: error,
    };
  }
}

const getUser = async ( userId ) => {
  try {
    const user = await User.findById(userId);
    return {
      id: userId,
      name: user.name,
      email: user.email,
    };
  } catch (error) {
    return {
      error: error,
    };
  }
}

const deleteUser = async (userId) => {
  try {
    const user = await User.findByIdAndDelete(userId);
    return user;
  } catch (error) {
    return {
      error: error,
    };
  }
}

const resetPassword = async (userId, userData) => {
  try {
    const { password, confirmPassword } = userData;

    if (password.length < 8) {
      return {
        error: 'Password is not valid, it must have a length of 8 characters or more',
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

    return {
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    };
  } catch (error) {
    return {
      error: error,
    };
  }
}

module.exports = {
  registerUser,
  loginUser,
  getUser,
  deleteUser,
  resetPassword,
};
