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
          image: await data.image,
          gender: data.gender === "1" ? true : false,
          roleid: "R2",
          positionid: "R2",
        },
      });
      console.log(user);
      const token = user[1]
        ? jwt.sign(
            {
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              address: user.address,
              phone: user.phone,
              image: await user.image,
              gender: user.gender,
              roleid: user.roleid,
              positionid: user.positionid,
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
          errCode: -1,
          message: user[1] ? "" : "email invaild",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

exports.getTopRecordDoctor = (limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!limit) {
        limit = 10;
      }
      let data = await db.user.findAll({
        limit: parseInt(limit),
        where: { roleid: "R2" },
        order: [["createdAt", "DESC"]],
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.allcodes,
            as: "positionData",
            attributes: ["valueENG", "valueVI"],
          },
          // {
          //   model: db.allcodes,
          //   as: "genderData",
          //   attributes: ["valueENG, valueVI"],
          // },
        ],
        raw: true,
        nest: true,
      });
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

exports.getAllDoctor = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = db.user.findAll({
        where: { roleid: "R2" },
        attributes: {
          exclude: ["password"],
        },
      });
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
