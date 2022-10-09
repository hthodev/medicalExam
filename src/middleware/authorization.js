import jwt from "jsonwebtoken";

exports.checkLogin = (req, res, next) => {
  try {
    const token = req.headers["api-token"];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    if (user) {
      req.data = user;
      next();
    } else {
      res.json({ code: 401, message: "Not Permission" });
    }
  } catch (error) {
    res.json({ code: 500, message: error.message });
  }
};

exports.checkAdmin = (req, res, next) => {
  try {
    if (req.data.roleid === 0) {
      next();
    } else {
      res.json({
        code: 403,
        message: "You can't access this page without permission",
      });
    }
  } catch (error) {
    res.json({ code: 500, message: error.message });
  }
};

exports.checkDoctor = (req, res, next) => {
  try {
    if (req.data.roleid === 1) {
      next();
    } else {
      res.json({
        code: 403,
        message: "You can't access this page without permission",
      });
    }
  } catch (error) {
    res.json({ code: 500, message: error.message });
  }
};
