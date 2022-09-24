import express from "express";
import { signup, login, welcome } from "../controller/controller.js";
import tokenVerify from "../middleware/authentication.js";
const router = express.Router();
/** This routes for registration */
router.post("/signup", signup);
/** This routes for login */
router.post("/login", login);
/** This routes for welcome */
router.get("/welecome", tokenVerify, welcome);
export default router;
