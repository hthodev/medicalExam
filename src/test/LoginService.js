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

exports.Login = (email, password) => {
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
    } catch (error) {
      reject(error);
    }
  });
};
