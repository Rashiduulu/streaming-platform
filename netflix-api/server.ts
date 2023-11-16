declare var require: any;

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/UserRoutes");
const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/netflix")
  .then(() => {
    console.log("DB connected");
  })
  .catch((error: Error) => {
    console.error("Error connecting to the database: " + error);
  });

app.use("/api/user", userRoutes);

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
