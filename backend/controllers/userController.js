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

const loginUser = async (req, res) => {
  try {
    const userData = req.body;

    const user = await userService.loginUser(userData);
    if (user?.error) {
      return res.status(403).send(user.error);
    }

    res.status(201).json({ user });
  } catch(error) {
    res.status(500).send(
      `An Error occurred while registering user, Error: ${error}`,
    );
  }
}

module.exports = {
  registerUser,
  loginUser,
};
