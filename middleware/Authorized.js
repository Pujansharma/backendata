
const jwt=require("jsonwebtoken");
require("dotenv").config();

const authentication=(req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
      const payload = jwt.verify(token, 'masai');
      req.userId = payload.userId;
      next();
    } catch (error) {
      res.status(401).json({ error: 'Unauthorized' });
    }
  };

module.exports={authentication}