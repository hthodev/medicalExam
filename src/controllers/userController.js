import userService from '../service/userService';

let createUser = async (req, res) => {
  let data = req.body;
  let mes = await userService.createRecordUser(data);
  return res.send(mes);
};

let loginUser = async (req, res) => {
  let data = req.body;
  let mes = await userService.LoginRecordUser(data);
  return res.send(mes);
};

let getAllUser = async (req, res) => {
  let result = await userService.getAllRecordUser();
  return res.send(result);
};

module.exports = {
  createUser: createUser,
  getAllUser: getAllUser,
  loginUser: loginUser
}