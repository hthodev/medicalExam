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
          image: data.STRING,
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
              image: user.image,
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
          message: "registry successfully",
          acess_token: token ? `Baerer ${token}` : token,
        });
      } else {
        resolve({
          errCode: 1,
          message: user[1] ? "" : "email invaild",
        });
      }
    } catch (error) {
      reject({
        errCode: 1,
        error,
      });
    }
  });
};

//create doctor
exports.createRecordDoctor = (data) => {
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
          image: data.STRING,
          gender: data.gender === "1" ? true : false,
          roleid: 1,
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
              image: user.image,
              gender: user.gender,
              roleid: user.roleid,
            },
            process.env.JWT_SECRET,
            { expiresIn: "30m" }
          )
        : null;

      if (token) {
        resolve({
          errCode: 0,
          message: "registry successfully",
          acess_token: token ? `Baerer ${token}` : token,
        });
      } else {
        resolve({
          errCode: 1,
          message: user[1] ? "" : "email invaild",
        });
      }
    } catch (error) {
      reject({
        errCode: 1,
        error,
      });
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

exports.getRecordUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userId) {
        let data = await db.user.findAll({
          attributes: { exclude: ["password"] },
        });
        resolve(data);
      } else {
        let data = await db.user.findByPk(userId, {
          attributes: { exclude: ["password"] },
        });
        resolve(data);
      }
    } catch (error) {
      reject({
        errCode: 1,
        message: "data not invaid",
      });
    }
  });
};

exports.deleteRecordAccount = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.user.destroy({
        where: { id: userId },
      });
      resolve({
        errCode: 0,
        message: "Deleting successfully",
      });
    } catch (error) {
      reject({
        errCode: 1,
        error,
      });
    }
  });
};

exports.updateRecordAccount = (idUser, dataUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.user.update(
        {
          email: dataUser.email,
          password: dataUser.password,
          firstName: dataUser.firstName,
          lastName: dataUser.lastName,
          address: dataUser.address,
          phone: dataUser.phone,
          image: dataUser.image,
          gender: dataUser.gender === 1 ? true : false,
        },
        {
          where: { id: idUser },
        }
      );
      resolve({
        errCode: 0,
        message: "Updated successfully",
      });
    } catch (error) {
      reject(error);
    }
  });
};
