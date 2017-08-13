var mongoose = require("mongoose");

//schema Setup
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
<<<<<<< HEAD
  cost: Number,
  location : String,
  lat: Number,
  lng: Number,
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
  },
  comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
  }]
});

module.exports = mongoose.model("Campground", campgroundSchema);
