

const auth = (req, res, next) => {
  try {
    const { accessToken } = req.body;
    
  } catch (err) {
    next(err);
  }
}