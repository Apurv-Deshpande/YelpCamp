var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
<<<<<<< HEAD
var middleware = require("../middleware")

//comments new route
router.get("/new", middleware.isLoggedIn, function(req,res){
=======

//comments new route
router.get("/new", isLoggedIn, function(req,res){
>>>>>>> a9aa5bf2d42c49b8a824f93b2d3fafe7e85e0235
//find Campground by ID
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
    }else{
      res.render("comments/new", {campground: campground});
    }
  });

//Comments post route
<<<<<<< HEAD
router.post("/",middleware.isLoggedIn, function(req,res){
=======
router.post("/",isLoggedIn, function(req,res){
>>>>>>> a9aa5bf2d42c49b8a824f93b2d3fafe7e85e0235
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
      res.redirect("/campgrounds");
    } else{
      Comment.create(req.body.comment, function(err, comment){
        if(err){
<<<<<<< HEAD
          req.flash("error", "Something went wrong");
=======
>>>>>>> a9aa5bf2d42c49b8a824f93b2d3fafe7e85e0235
          console.log(err);
        } else{
          //add username and id to comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          campground.comments.push(comment);
          campground.save();
          console.log(comment);
<<<<<<< HEAD
          req.flash("success", "Successfully added Comment");
=======
>>>>>>> a9aa5bf2d42c49b8a824f93b2d3fafe7e85e0235
          res.redirect('/campgrounds/' + campground._id);
        }
      });
    }


  });
});
});

<<<<<<< HEAD
//Comment edit route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req,res){
  Comment.findById(req.params.comment_id,function(err, foundComment){
    if(err){
      res.redirect("back");
    } else{
    res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
    }
  });

});

//Comment Update Router

router.put("/:comment_id", middleware.checkCommentOwnership, function(req,res){

  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
    if(err){
      res.redirect("back");
    } else{
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

//Comment Destroy routes
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req,res){
  Comment.findByIdAndRemove(req.params.comment_id, function(err){
    if(err){
      res.redirect("back");
    } else{
      req.flash("success", "Comment Deleted");
      res.redirect("/campgrounds/" + req.params.id);
    }
  })
});
=======
//middleware
function isLoggedIn(req,res,next){
if(req.isAuthenticated()){
  return next();
}
res.redirect("/login");
}

>>>>>>> a9aa5bf2d42c49b8a824f93b2d3fafe7e85e0235
module.exports = router;
