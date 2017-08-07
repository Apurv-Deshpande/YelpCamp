var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");


//index route showing all campgrounds
router.get("/", function(req,res){// get method

//Getting all camgrounds from db
Campground.find({},function(err, allCampgrounds){
  if(err){
    console.log(err);
  }else{
    res.render("campgrounds/index", {campgrounds:allCampgrounds, currentUser:req.user});
  }
})
});

//create route -add new Campground to datbase
router.post("/",isLoggedIn, function(req,res){
  //getiing data from form and add to campgrounds array
  var name=req.body.name;
  var image=req.body.image;
  var desc=req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  }
  var newCampground = {name:name, image:image, description:desc, author:author}


  //campgrounds.push(newCampground)
  //create a Campground and save to file
  Campground.create(newCampground, function(err, newlyCreated){
    if(err){
      console.log(err)
    }
    else{

      res.redirect("/campgrounds");//redirect to campgrounds page
    }
  });
});
//NEW Route- show form to create new campgrounds
router.get("/new", isLoggedIn, function(req,res){
res.render("campgrounds/new");//New Page
});

//SHOW Route more information about single campground
router.get("/:id", function(req,res){
  //find the Campground with Provided ID
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if(err){
      console.log(err)
    }
    else{
      console.log(foundCampground);
      //find Campground by id
      Campground.findById(req.params.id, function(err, campground){
        if(err){
          console.log(err);
        }else{
          res.render("campgrounds/show", {campground: foundCampground}); //render to show template
        }
      })


    }
  });

});

function isLoggedIn(req,res,next){
if(req.isAuthenticated()){
  return next();
}
res.redirect("/login");
}

module.exports = router;
