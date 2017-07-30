var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground=require("./models/campground"),
    Comment = require("./models/comment"),
    seedDB =require("./seeds");
    //Comment = require("./models/comment"),
  //  User = require("\./models/user")


//Remove all campgrounds
mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});//mongoose connection
app.use(bodyParser.urlencoded({extended: true}));

//view engine set
app.set("view engine", "ejs");
app.use(express.static(__dirname +"/public"));
seedDB();


app.get("/", function(req,res){
  res.render("Landing"); //Landing Page
});

//index route showing all campgrounds
app.get("/campgrounds", function(req,res){// get mehod
//Getting all camgrounds from db
Campground.find({},function(err, allCampgrounds){
  if(err){
    console.log(err);
  }else{
    res.render("campgrounds/index", {campgrounds:allCampgrounds});
  }
})
});

//create route -add new Campground to datbase
app.post("/campgrounds", function(req,res){
  //getiing data from form and add to campgrounds array
  var name=req.body.name;
  var image=req.body.image;
  var desc=req.body.description;
  var newCampground = {name:name, image:image, description:desc}
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
app.get("/campgrounds/new", function(req,res){
res.render("campgrounds/new");//New Page
});

//SHOW Route more information about single campground
app.get("/campgrounds/:id", function(req,res){
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

//--------------------------------
//Comment routes
//--------------------------------
app.get("/campgrounds/:id/comments/new", function(req,res){
//find Campground by ID
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
    }else{
      res.render("comments/new", {campground: campground});
    }
  });
app.post("/campgrounds/:id/comments", function(req,res){
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
      res.redirect("/campgrounds");
    } else{
      Comment.create(req.body.comment, function(err, comment){
        if(err){
          console.log(err);
        } else{
          campground.comments.push(comment);
          campground.save();
          res.redirect('/campgrounds/' + campground._id);
        }
      });
    }


  });
});
});
//App running on server
app.listen(3000, function(){
  console.log("Yelp Camp running on locahost:3000")
});
