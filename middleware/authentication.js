import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const tokenVerify = (req, res, next) => {
  const token = req.get("Authorization");
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const tokendecode = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = tokendecode;
  } catch (error) {
    return res.status(401).send("Invalid Token");
    console.log;
  }
  return next();
};
export default tokenVerify;
