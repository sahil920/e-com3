const mongoose = require("mongoose");

function connectDb() {
  mongoose.connect(`${process.env.MONGO_URI}`);

  mongoose.connection.on("error", (err) => {
    console.log("connection failed");
  });

  mongoose.connection.on("connected", (connected) => {
    console.log("connected with the data base");
  });
}

module.exports = connectDb;
