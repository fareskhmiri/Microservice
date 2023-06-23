require("dotenv").config({ path: "./variables.env" });
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const eurekaHelper = require("./eureka-helper");
const articleRouter = require("./routes/messages");

const PORT = process.env.PORT || 3000;

mongoose.connect(
  "mongodb+srv://admin:admin@node.zcydgqx.mongodb.net/microservice?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log(mongoose.connection.readyState)
);
let db = mongoose.connection;

// Check db connection
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Check for db errors
db.on("error", (error) => {
  console.error("DB Error: ", error);
});

app.use(express.json());

// parse application form url encoded
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
  console.log("messages-service on 3000");
});

app.get("/api/messages", (req, res) => {
  res.json("I am messages-service");
});

app.use("/api/messages", articleRouter);

eurekaHelper.registerWithEureka("messages-service", PORT);
