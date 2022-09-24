import userModel from "../model/model.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
const saltRound = 10;
dotenv.config();
/** This function for registration */
export const signup = async (req, res) => {
  const { userFullName, username, password } = req.body;
  /** This is check for all field required */
  if (!userFullName || !username || !password) {
    return res.status(400).json({ error: "please fill the field properly" });
  }
  try {
    /** This is for check user already  exist or not*/
    const checkDulpicacyUser = await userModel.findOne({ username });
    if (checkDulpicacyUser) {
      return res.status(409).json("user is already exist. please login");
    }
    /**
     * creating hash password
     */
    const hashPassword = await bcrypt.hash(password, saltRound);
    const userNew = await userModel.create({
      userFullName: userFullName,
      username:
        username.toLowerCase() /** This is convert username to lower case */,
      password: hashPassword,
    });
    /** Create token*/
    const token = jwt.sign(
      { user_id: userNew._id, username },
      process.env.TOKEN_KEY,
      {
        expiresIn: "1h" /** This token expired on 1 hour */,
      }
    );
    /**save user token */
    userNew.token = token;
    res.status(200).json(userNew);
  } catch (error) {
    res.status(400).json({ error: "registration failed" });
    console.log(error);
  }
};

/** This function for login */
export const login = async (req, res) => {
  const { username, password } = req.body;
  /** This is check for all field required */
  if (!username || !password) {
    return res.status(400).json({ message: "Plz Filled the data" });
  }
  try {
    /** This is for find user data */
    const user = await userModel.findOne({ username: username.toLowerCase() });
    if (!user) {
      return res.status(400).json({ message: "Invalid data" });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({ message: "Invalid data" });
        console.log("Invalid data");
      } else {
        /***Create token*/
        const token = jwt.sign(
          { user_id: user._id, username },
          process.env.TOKEN_KEY,
          {
            expiresIn: "1h" /** This token expired on 1 hour */,
          }
        );

        /** save token */
        user.token = token;

        // user
        res.status(200).json(user);
        console.log("user login successfully happy !");
      }
    }
  } catch (error) {
    res.status(400).json({ message: "Login failed" });
    console.log(error);
  }
};
/**This routes for welcome */
export const welcome = async (req, res, next) => {
  try {
    await res.status(200).send("welcome");
  } catch (error) {
    await res.status(401).send("Authentication failed");
  }
};
