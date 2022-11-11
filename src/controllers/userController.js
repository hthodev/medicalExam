import { validationResult } from "express-validator";
import userService from "../service/userService";

exports.createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  let data = req.body;
  let mes = await userService.createRecordUser(data);
  return res.send(mes);
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

exports.getAllUser = async (req, res) => {
  let result = await userService.getAllRecordUser();
  return res.send(result);
};
