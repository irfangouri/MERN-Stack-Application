const { verifyAccessToken } = require('../utils/helpers');
const User = require('../models/user');


const authMiddleware = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization;
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
      });
    }

    const userDetails = await verifyAccessToken(accessToken);
    if (userDetails?.error) {
      return res.status(403).json({
        error: userDetails.error,
      });
    }

    if (userDetails.userData._id != userId) {
      return res.status(401).json({
        error: 'Unauthorized access',
      });
    }

    next();
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
}

module.exports = authMiddleware;
