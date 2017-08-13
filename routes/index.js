var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user")

//root route
router.get("/", function(req,res){
  res.render("Landing"); //Landing Page
});

//show registration form
router.get("/register", function(req,res){
<<<<<<< HEAD
  res.render("register", {page: "register"});
=======
  res.render("register");
>>>>>>> a9aa5bf2d42c49b8a824f93b2d3fafe7e85e0235
});

//Signup form
router.post("/register", function(req,res){
<<<<<<< HEAD
  var newUser = new User(
    {
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      avatar: req.body.avatar,
      email: req.body.email
  });
  if(req.body.adminCode === 'secretcode123'){
    newUser.isAdmin = true;
  }

  User.register(newUser, req.body.password, function(err, user){
    if(err){
      console.log(err);
      return res.render("register", {error: err.message});
    }
    passport.authenticate("local")(req,res, function(){
      req.flash("success", "Successfully Signed Up! Nice to meet you" + req.body.username);
=======
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req,res, function(){
>>>>>>> a9aa5bf2d42c49b8a824f93b2d3fafe7e85e0235
      res.redirect("/campgrounds");
    });
  })
});


//Login form
router.get("/login", function(req,res){
<<<<<<< HEAD
  res.render("login", {page:"login"});
=======
  res.render("login");
>>>>>>> a9aa5bf2d42c49b8a824f93b2d3fafe7e85e0235
});

//handling login logic
router.post("/login", passport.authenticate("local",
{
  successRedirect: "/campgrounds",
  failureRedirect: "/login"
}), function(req,res){

});

//logout logic

router.get("/logout", function(req,res){
  req.logout();
<<<<<<< HEAD
  req.flash("success", "Logged you out");
  res.redirect("/campgrounds");
});

//Users Profiles
router.get("/users/:id", function(req,res){
  User.findById(req.params.id, function(err, foundUser){
    if(err){
      req.flash("error", "Something went wrong");
      res.redirect("/");
    }
    res.render("users/show", {user: foundUser});
  });
});
=======
  res.redirect("/campgrounds");
});

//middleware
function isLoggedIn(req,res,next){
if(req.isAuthenticated()){
  return next();
}
res.redirect("/login");
}
>>>>>>> a9aa5bf2d42c49b8a824f93b2d3fafe7e85e0235

module.exports =router;
