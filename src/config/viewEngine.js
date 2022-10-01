import exports from "express";

let configViewEngine = (app) => {
    app.use(exports.static("./src/public"))
    app.set("view engine", "ejs");
    app.set("views", "./src/views")
}

module.exports = configViewEngine;