import mongoose from "mongoose";
/** This is a schema */
const userSchema = new mongoose.Schema({
  userFullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
});
const userModel = mongoose.model("userlogindetail", userSchema);
export default userModel;
