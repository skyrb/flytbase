const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const isPublic = req.url.includes('public');
  if (isPublic) {
    next();
  } else {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          return res.sendStatus(401);
        }
        req.user = user;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  }
};


module.exports = authenticateToken;
