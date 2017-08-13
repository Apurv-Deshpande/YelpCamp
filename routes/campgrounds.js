var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
<<<<<<< HEAD
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
=======


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
>>>>>>> a9aa5bf2d42c49b8a824f93b2d3fafe7e85e0235
  var desc=req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  }
<<<<<<< HEAD
  geocoder.geocode(req.body.location, function (err, data) {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address;
  var newCampground = {name:name, image:image, cost: cost, description:desc, author:author, location: location, lat: lat, lng: lng}
=======
  var newCampground = {name:name, image:image, description:desc, author:author}
>>>>>>> a9aa5bf2d42c49b8a824f93b2d3fafe7e85e0235


  //campgrounds.push(newCampground)
  //create a Campground and save to file
  Campground.create(newCampground, function(err, newlyCreated){
    if(err){
      console.log(err)
    }
    else{

      res.redirect("/campgrounds");//redirect to campgrounds page
    }
<<<<<<< HEAD
    });
    });
});
//NEW Route- show form to create new campgrounds
router.get("/new", middleware.isLoggedIn, function(req,res){
=======
  });
});
//NEW Route- show form to create new campgrounds
router.get("/new", isLoggedIn, function(req,res){
>>>>>>> a9aa5bf2d42c49b8a824f93b2d3fafe7e85e0235
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
<<<<<<< HEAD
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req,res){
=======
router.get("/:id/edit", checkCampgroundOwnership, function(req,res){
>>>>>>> a9aa5bf2d42c49b8a824f93b2d3fafe7e85e0235
Campground.findById(req.params.id, function(err, foundCampground){
      res.render("campgrounds/edit", {campground: foundCampground});
      });
  });

//Update Campground Route
<<<<<<< HEAD
/*router.put("/:id", middleware.checkCampgroundOwnership, function(req,res){

=======
router.put("/:id", checkCampgroundOwnership, function(req,res){
>>>>>>> a9aa5bf2d42c49b8a824f93b2d3fafe7e85e0235
  Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
    if(err){
      console.log(err);
    }else{
      res.redirect("/campgrounds/" +req.params.id)
    }
  })
<<<<<<< HEAD
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
=======
});

//DESTROY Campground Route
router.delete("/:id", checkCampgroundOwnership, function(req,res){
>>>>>>> a9aa5bf2d42c49b8a824f93b2d3fafe7e85e0235
  Campground.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/campgrounds");
    } else{
      res.redirect("/campgrounds");
    }
  });
});

<<<<<<< HEAD
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
=======
//middleware
function isLoggedIn(req,res,next){
if(req.isAuthenticated()){
  return next();
}
res.redirect("/login");
}

function checkCampgroundOwnership(req,res,next){
  if(req.isAuthenticated()){
    Campground.findById(req.params.id, function(err, foundCampground){
      if(err){
        res.redirect("back");
      }else{
        //owner is who created campground
      if(foundCampground.author.id.equals(req.user._id)){
        next();
      }else{
        res.redirect("back");
          }
      }
    });
  }else{
    res.redirect("back");
  }
}
>>>>>>> a9aa5bf2d42c49b8a824f93b2d3fafe7e85e0235

module.exports = router;
