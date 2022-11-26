const express = require("express");
const bodyParser = require("body-parser");
// const viewEngine = require("./config/viewEngine");
const initWebRoutes = require("./route/web");
const connectDB = require("./config/connectDB");
const cors = require("cors");

require("dotenv").config();
let app = express();
app.use(cors({ origin: true }));
//config app

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// viewEngine(app);
initWebRoutes(app);

connectDB(app);

let port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("Nodejs running on the port " + port);
});

// npx cross-env NODE_ENV=test npx sequelize-cli db:create
module.exports = {
  app
};
