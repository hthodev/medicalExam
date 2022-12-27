const { validationResult } = require("express-validator");
const userService = require("../service/userService");

exports.createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      result: false,
      message: errors.array(),
    });
  }

  let data = req.body;
  if (data) {
    let result = await userService.createRecordUser(data);
    return res.status(200).json({ result });
  } else {
    return res.status(500).json({ message: "Please input data!" });
  }
};

exports.createDoctor = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }
  let data = req.body;

  if (data) {
    let result = await userService.createRecordDoctor(data);
    return res.status(200).json({ result });
  } else {
    return res.status(500).json({ message: "Please input data!" });
  }
};

exports.loginUser = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  let message = await userService.LoginRecordUser(email, password);

  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs parameter!",
    });
  }
  return res.status(200).json({
    message,
  });
};

exports.getUser = async (req, res) => {
  let id = req.query.id;
  let result = await userService.getRecordUser(id);
  return res.status(200).json({
    messgae: 'Get list users successfully',
    result: result
  });
};

exports.deleteAccount = async (req, res) => {
  let id = req.query.id;
  if (id) {
    let result = await userService.deleteRecordAccount(id);
    res.status(200).json({ result });
  } else {
    res.status(500).json({ message: "Input data is not invaid" });
  }
};

exports.updateAccount = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let data = req.body;
  let id = req.query.id;
  if (data) {
    let result = await userService.updateRecordAccount(id, data);
    return res.status(200).json({ result });
  } else {
    return res.status(500).json({ message: "Please input data" });
  }
};
