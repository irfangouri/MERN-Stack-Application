const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { emailSchema, passwordSchema } = require('../validations/types.js');
const User = require('../models/user.js');

const registerUser = async (req, res, next) => {
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

    if (user) {
      return res.status(403).send('User already registered');
    }

    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();
    return res.status(201).json({
      id: newUser._id,
      username: newUser.username,
    });
  } catch(err) {
    next(err);
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

    const accessToken = jwt.sign({ user }, process.env.JWT_SECRET_MESSAGE);

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
