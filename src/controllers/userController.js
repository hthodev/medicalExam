import userService from '../service/userService';

exports.createUser = async (req, res) => {
  let data = req.body;
  let mes = await userService.createRecordUser(data);
  return res.send(mes);
};

exports.loginUser = async (req, res) => {
  let data = req.body;
  let mes = await userService.LoginRecordUser(data);
  return res.send(mes);
};

exports.getAllUser = async (req, res) => {
  let result = await userService.getAllRecordUser();
  return res.send(result);
};
