const jwt = require("jsonwebtoken");

exports.checkLogin = (req, res, next) => {
  try {
    const token = req.headers["api-token"];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    if (user) {
      req.data = user;
      next();
    } else {
      res.status(401).json({ message: "Not Permission" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.checkAdmin = (req, res, next) => {
  try {
    if (req.data.roleid === 0) {
      next();
    } else {
      res.status(403).json({ message: "You can't access this page without permission" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.checkDoctor = (req, res, next) => {
  try {
    if (req.data.roleid === 1) {
      next();
    } else {
      res.status(403).json({ message: "You can't access this page without permission" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
