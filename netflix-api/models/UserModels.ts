const mongooseModule = require("mongoose");
declare var module: any;
declare var require: any;

const userScheme = new mongooseModule.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  likedMovies: [],
});

module.exports = mongooseModule.model("users", userScheme);
