const jwt = require("jsonwebtoken");
require("dotenv").config()
const ensureAuthenticated = (req, res, next) => {
    
  const authHeader = req.headers["token"];
  const auth = authHeader.split(' ')[1]
  
  if (!auth) {
    return res
      .status(403)
      .json({ message: "Unauthorized, JWT token is require" });
  }
  try {
    const decoded = jwt.verify(auth, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Unauthorized, JWT token wrong or expired" });
  }
};

module.exports = {ensureAuthenticated};
