const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

const userService = require('../services/userService');

const registerUser = async (req, res) => {
  try {
    const userData = req.body;

    const user = await userService.registerUser(userData);
    if (user?.error) {
      return res.status(403).send(user.error);
    }

    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch(error) {
    res.status(500).send(
      `An Error occurred while registering user, Error: ${error}`,
    );
  }
}

const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if ( !username || !password ) {
      return res.status(403).send('Please fill all the fields');
    }

    const usernameValidation = emailSchema.safeParse(username);
    const passwordValidation = passwordSchema.safeParse(password);

    if (
      !usernameValidation.success
      || !passwordValidation.success
    ) {
      return res.status(403).send('Validation error, please check your fields');
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(403).send('User does not exist, please register first');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(403).send('Password is wrong, please re-check your password');
    }

    const accessToken = jwt.sign({ user }, process.env.JWT_SECRET);

    return res.status(201).json({
      'access-token': accessToken,
    });
  } catch(err) {
    next(err);
  }
}

module.exports = {
  registerUser,
  loginUser,
};
