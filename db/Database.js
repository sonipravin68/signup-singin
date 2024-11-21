const mongoose = require("mongoose");

const connectDb = async () => {
  dbUri = "mongodb://localhost:27017/login&Register";
  await mongoose.connect(dbUri);
  console.log("database connected");
};

connectDb();
