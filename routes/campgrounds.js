var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");
var geocoder = require("geocoder");

//index route showing all campgrounds
router.get("/", function(req,res){// get method
  var noMatch = '';
if(req.query.search){
  const regex = new RegExp(escapeRegex(req.query.search), 'gi');
  //Getting all camgrounds from db
  Campground.find({name: regex},function(err, allCampgrounds){
    if(err){
      console.log(err);
      }else{

        if(allCampgrounds.length < 1){
          noMatch = "No Campground match the query. Make a new one";
        }
      res.render("campgrounds/index", {campgrounds:allCampgrounds, currentUser:req.user, page: "campgrounds", noMatch: noMatch});
    }
  })
}else {
  //Getting all camgrounds from db

    Campground.find({},function(err, allCampgrounds){
      if(err){
      console.log(err);
      }else{
    res.render("campgrounds/index", {campgrounds:allCampgrounds, currentUser:req.user, page: "campgrounds", noMatch: noMatch});
    }
  })
}

});

//create route -add new Campground to datbase
router.post("/",middleware.isLoggedIn, function(req,res){
  //getiing data from form and add to campgrounds array
  var name=req.body.name;
  var image=req.body.image;
  var cost = req.body.cost;
  var desc=req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  }
  geocoder.geocode(req.body.location, function (err, data) {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address;
  var newCampground = {name:name, image:image, cost: cost, description:desc, author:author, location: location, lat: lat, lng: lng}


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
});
//NEW Route- show form to create new campgrounds
router.get("/new", middleware.isLoggedIn, function(req,res){
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

//EDIT Campground Route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req,res){
Campground.findById(req.params.id, function(err, foundCampground){
      res.render("campgrounds/edit", {campground: foundCampground});
      });
  });

//Update Campground Route
/*router.put("/:id", middleware.checkCampgroundOwnership, function(req,res){

  Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
    if(err){
      console.log(err);
    }else{
      res.redirect("/campgrounds/" +req.params.id)
    }
  })
}); */

router.put("/:id", function(req, res){
  geocoder.geocode(req.body.location, function (err, data) {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address;
    var newData = {name: req.body.name, image: req.body.image, description: req.body.description, cost: req.body.cost, location: location, lat: lat, lng: lng};
    Campground.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, campground){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/campgrounds/" + campground._id);
        }
    });
  });
});

//DESTROY Campground Route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req,res){
  Campground.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/campgrounds");
    } else{
      res.redirect("/campgrounds");
    }
  });
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;
