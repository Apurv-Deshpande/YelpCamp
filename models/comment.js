var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
  text: String,
<<<<<<< HEAD
  createdAt: {
    type: Date,
    default: Date.now
  },
=======
>>>>>>> a9aa5bf2d42c49b8a824f93b2d3fafe7e85e0235
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  }
});
module.exports = mongoose.model("Comment", commentSchema);
