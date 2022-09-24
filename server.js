import express from "express";
import dbConnection from "./connection/connection.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/routes.js";
const app = express();
dotenv.config();
const dbPassword = process.env.DBPASSWORD;
const port = process.env.PORT;
/** This function use for database connection */
dbConnection(dbPassword);
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(router);
/** This is for listening server */
app.listen(port, () => {
  console.log(`App is listening ${port}`);
});
