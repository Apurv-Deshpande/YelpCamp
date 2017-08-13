var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function (req,res,next){
  if(req.isAuthenticated()){
      Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
          req.flash("error", "Campground not found");
          res.redirect("back");
        }else{
          //owner is who created campground
        if(foundCampground.author.id.equals(req.user._id) || req.user.isAdmin){
          next();
        }else{
          req.flash("error", "permission Necessary to make changes");
          res.redirect("back");
            }
        }
      });
    }else{
      req.flash("error", "Login is necessary to make changes");
      res.redirect("back");
    }
  }

middlewareObj.checkCommentOwnership = function (req,res,next){
  if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
        res.redirect("back");
      }else{
        //is the owner of comment
      if(foundComment.author.id.equals(req.user._id) || req.user.isAdmin){
        next();
      }else{
        req.flash("error", "Permission is necessary to make changes");
        res.redirect("back");
          }
      }
    });
  }else{
    req.flash("error", "Login is necessary to make changes");
    res.redirect("back");
  }
}

middlewareObj.isLoggedIn = function(req,res,next){
if(req.isAuthenticated()){
  return next();
}
req.flash("error", "Login is necessary to make changes");
res.redirect("/login");
}

module.exports = middlewareObj
