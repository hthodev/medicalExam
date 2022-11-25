import express from "express";
import LoginController from "./testUserLogin.test";

let router = express.Router();
let initTest = (app) => {
  router.post("/loginacb", LoginController.LoginController);

  return app.use("/api", router);
};
module.exports = initTest;
