//requires
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const colors = require("colors");

//instances
const app = express();

//listener
app.listen(3001, () => {
  console.log("API server listening on port 3001");
});

//express config
app.use(morgan("tiny"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(cors());

//express routes
app.use("/api", require("./routes/users.js"));
app.use("/api", require("./routes/projects"));
app.use("/api", require("./routes/requisiciones"));


module.exports = app;

//Mongo Connection
const mongoUserName = "";
const mongoPassword = "";
const mongoHost = "127.0.0.1";
const mongoPort = "27017";
const mongoDatabase = "warmind2x_test_db";

var uri =
  "mongodb://" +
  mongoUserName +
  ":" +
  mongoPassword +
  "@" +
  mongoHost +
  ":" +
  mongoPort +
  "/" +
  mongoDatabase;

var uri2 = "mongodb://"+ mongoHost + ":" + mongoPort + "/" + mongoDatabase;

const options = {
  
  authSource: "admin"
};

try {
    mongoose.connect(uri2, options).then(
        () => {
          console.log("\n");
          console.log("*******************************".green);
          console.log("✔ Mongo Successfully Connected!".green);
          console.log("*******************************".green);
          console.log("\n");
        },
        (err) => {
          console.log("\n");
          console.log("*******************************".red);
          console.log("    Mongo Connection Failed    ".red);
          console.log("*******************************".red);
          console.log("\n");
          console.log(err);
        }
      );
} catch (error) {
    console.log("ERROR CONNECTING MONGO ");
    console.log(error);
}