const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;

console.log("mongodb uri", uri);

const connectDb = async () => {
  await mongoose.connect(uri);
  console.log("database connected");
};

connectDb();
