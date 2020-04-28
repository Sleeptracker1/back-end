require("dotenv").config();
const jwt = require("jsonwebtoken");

const restrict = (req, res, next) => {
  const authError = {
    message: "Invalid credentials.",
  };
  const token = req.get("authorization");

  try {
    if (!token) {
      return res.status(401).json(authError);
    }

    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET,
      (err, decoded) => {
        if (err) {
          return res.status(401).json(authError);
        }

        //can user user info if needed for other routes
        req.tokenPayload = decoded;

        next();
      }
    );
  } catch (err) {
    next(err);
  }
};

module.exports = restrict;
