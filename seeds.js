var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment")

var data = [
  {
    name: "Ballyness Caravan Park",
    image: "https://cdn.csuk-solutions.net/uploads/4f/6046207-ballyness-caravan-park-2.jpg",
    description: "blah blah blah"
  },

  {name: "OpenPark",
  image: "http://l7.alamy.com/zooms/dd83c218397d4d529edbdf17036ab3f3/inner-city-open-park-land-in-the-heart-of-the-city-of-london-bjdmyr.jpg",
  description: "blah blah blah"
},
  {name: "Loughcrew Megalithic Centre",
  image:"http://www.loughcrewmegalithiccentre.com/wp-content/uploads/2016/03/ForeAbbey1.jpg",
  description: "blah blah blah"
},
]

function seedDB(){
  Campground.remove({}, function(err){
  if(err){
    console.log(err);
  }
  console.log("removed campgrounds");
  });
  //add new camgrounds
    data.forEach(function(seed){
    Campground.create(seed, function(err, campground){
      if(err){
        console.log(err);
      }else{
        console.log("added a campground");
        //create a comment
        Comment.create(
          {
          text: "This Place is great, but no Internet",
          author: "Homer"
        }, function(err, comment){
          if(err){
            console.log(err);
          } else{
            campground.comments.push(comment);
            campground.save();
            console.log("Created New Comment");
          }

        })
      }
    });
  });
};

module.exports = seedDB;
