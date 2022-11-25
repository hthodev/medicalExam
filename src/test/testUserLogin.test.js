const { request } = require("express");
const db = require("../models");
import bcrypt, { hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import LoginService from "./LoginService";

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

exports.LoginController = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    return res.status(400).json({
      error: -1,
      message: "Input parameter!",
    });
  } else {
    let data = await LoginService.Login(email, password);
    return res.status(200).json({
      data,
    });
  }
};

const exam1 = {
  email: "",
  password: "123123",
};

describe("parameter!", (email, password) => {
  email = exam1.email;
  password = exam1.password;

  if (email == "") {
    console.log("input parameter!");
  }
  describe("login", () => {
    it("should return a 404", async () => {
      let data = await db.user.findOne({
        where: { email: email },
        raw: true,
      });
      console.log("check data: ", data);

      const isChecked = data && bcrypt.compareSync(password, data.password);

      if (isChecked) {
        console.log("login thanh cong");
      } else {
        data ? console.log("sai mk") : console.log("email chua dang ky");
      }
    });
  });
});
