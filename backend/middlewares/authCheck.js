const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['token']?.split(' ')[1]; // Extract Bearer token

  if (!token) {
    return res.status(401).send('Access Denied');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send('Invalid Token');
    }

    req.user = decoded; // You can access the decoded payload here
    next(); // Proceed to the next middleware or route handler
  });
};

export default verifyToken;