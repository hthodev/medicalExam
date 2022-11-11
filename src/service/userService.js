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
exports.createRecordUser = (data) => {
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
exports.LoginRecordUser = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.user.findOne({
        where: { email: email },
        raw: true,
      });
      const isChecked = user && bcrypt.compareSync(password, user.password);
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

      if (token) {
        resolve({
          errCode: 0,
          message: "login successfully",
          acess_token: token ? `Baerer ${token}` : token,
        });
      } else {
        resolve({
          errCode: 1,
          message: user ? "password wrong" : "email isn't registered",
        });
      }
      // resolve({
      //   message: token
      //     ? "login successfully"
      //     : user
      //     ? "password wrong"
      //     : "email isn't registered",
      //   acess_token: token ? `Baerer ${token}` : token,
      // });
    } catch (error) {
      reject(error);
    }
  });
};

exports.getAllRecordUser = () => {
  try {
    return new Promise(async (resolve, reject) => {
      resolve(await db.user.findAll());
    });
  } catch (error) {
    reject(error);
  }
};
