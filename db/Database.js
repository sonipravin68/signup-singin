const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;

console.log("mongodb uri", uri);

const connectDb = async () => {
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
    sslValidate: false, // Add this if SSL certificate validation fails
  });
  console.log("database connected");
};

connectDb();
