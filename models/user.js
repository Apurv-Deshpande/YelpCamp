var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
  username: String,
<<<<<<< HEAD
  password: String,
  avatar: String,
  firstName: String,
  lastName: String,
  email: String,
  isAdmin: {type: Boolean,default: false}
=======
  password: String
>>>>>>> a9aa5bf2d42c49b8a824f93b2d3fafe7e85e0235
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
