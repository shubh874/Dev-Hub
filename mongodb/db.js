const mongoose = require("mongoose");

const db =
  "mongodb+srv://shubh874:shubh874@cluster0.axn6u.mongodb.net/mern?retryWrites=true&w=majority";

const dbConnect = async () => {
  try {
    mongoose.connect(db, {
      useNewUrlParser: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = dbConnect;
