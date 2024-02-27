const mongoose = require("mongoose");

const connectDB = async (DB_URI) => {
  try {
    await mongoose.connect(DB_URI);
  } catch (error) {
    return "Error connecting to server database";
  }
};

module.exports = connectDB;
