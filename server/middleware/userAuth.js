import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized, login again" });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (!tokenDecode.id) {
      return res.status(401).json({ success: false, message: "Not authorized, invalid token" });
    }

    req.body.userId = tokenDecode.id;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default userAuth;
