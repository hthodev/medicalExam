import { validationResult } from "express-validator";
import userService from "../service/userService";

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
    return res.status(200).json({
      result,
    });
  } else {
    return res.status(500).json({
      errCode: 2,
      message: "Please input data!",
    });
  }
};

exports.loginUser = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  let message = await userService.LoginRecordUser(email, password);

  if (!email) {
    return res.status(500).json({
      errCode: -1,
      message: "Please Input account!",
    });
  }
  if (!password) {
    return res.status(500).json({
      errCode: -1,
      message: "Plese Input password!",
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
    errCode: 0,
    errMessage: "OK",
    result,
  });
};

exports.deleteAccount = async (req, res) => {
  let id = req.query.id;
  if (id) {
    let result = await userService.deleteRecordAccount(id);
    res.status(200).json({
      result,
    });
  } else {
    res.status(500).json({
      errCode: 2,
      message: "Input data is not invaid",
    });
  }
};

exports.updateAccount = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  let data = req.body;
  let id = req.query.id;
  if (data) {
    let result = await userService.updateRecordAccount(id, data);
    return res.status(200).json({
      result,
    });
  } else {
    return res.status(500).json({
      errCode: 2,
      message: "Please input data",
    });
  }
};
