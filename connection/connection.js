import mongoose from "mongoose";
const dbConnection = async (password) => {
  const dburl = `mongodb+srv://sunilkumarbais:${password}@cluster0.zbj8pxb.mongodb.net/?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(dburl);
    console.log("connection is successful");
  } catch (error) {
    console.log(`mongodb connection ${error}`);
  }
};
export default dbConnection;
