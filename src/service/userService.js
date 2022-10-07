import bcrypt, { hash } from "bcryptjs";
import db from "../models/index";
import jwt from "jsonwebtoken";

const salt = bcrypt.genSaltSync(10);

let hashPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hash = await bcrypt.hashSync(password, salt);
      resolve(hash);
    } catch (error) {
      reject(error);
    }
  });
};

/* user */
// create user. check email invaid
let createRecordUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.user.findOrCreate({
        where: { email: data.email },
        defaults: {
          email: data.email,
          password: await hashPassword(data.password),
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phone: data.phone,
          // image: data.STRING,
          gender: data.gender === "1" ? true : false,
          roleid: 2,
        },
      });
      const token = user[1]
        ? jwt.sign(
            {
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              address: user.address,
              phone: user.phone,
              // image: data.STRING,
              gender: user.gender,
              roleid: user.roleid,
            },
            process.env.JWT_SECRET,
            { expiresIn: "5d" }
          )
        : null;
      resolve({
        mesage: user[1] ? "successfully!" : "invaid!",
        acess_token: token ? `Baerer ${token}` : token,
      });
    } catch (error) {
      reject(error);
    }
  });
};

//login user
let LoginRecordUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.user.findOne({
        where: { email: data.email },
        raw: true,
      });
      const isChecked =
        user && bcrypt.compareSync(data.password, user.password);
      const token = isChecked
        ? jwt.sign(
            {
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              address: user.address,
              phone: user.phone,
              // image: data.STRING,
              gender: user.gender,
              roleid: user.roleid,
            },
            process.env.JWT_SECRET,
            { expiresIn: "5d" }
          )
        : null;

      resolve({
        massage: token
          ? "login successfully"
          : user
          ? "password wrong"
          : "email isn't registered",
        acess_token: token ? `Baerer ${token}` : token,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let getAllRecordUser = () => {
  try {
    return new Promise(async (resolve, reject) => {
      resolve(await db.user.findAll());
    });
  } catch (error) {
    reject(error);
  }
};

module.exports = {
  createRecordUser: createRecordUser,
  LoginRecordUser: LoginRecordUser,
  getAllRecordUser: getAllRecordUser
};