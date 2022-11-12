import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
import cors from "cors";

require("dotenv").config();
let app = express();
let port = process.env.PORT || 3000;
app.use(cors({ origin: true }));
//config app

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

viewEngine(app);
initWebRoutes(app);

connectDB(app);

app.listen(port, () => {
  console.log("Nodejs running on the port " + port);
});

export default app;
