var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Campground=require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user");

    seedDB =require("./seeds"); //seed the database


    //routes redirect requirings
    var commentRoutes = require('./routes/comments'),
        campgroundRoutes = require('./routes/campgrounds'),
        indexRoutes = require('./routes/index');




//Remove all campgrounds
mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});//mongoose connection
app.use(bodyParser.urlencoded({extended: true}));

//view engine set
app.set("view engine", "ejs");
app.use(express.static(__dirname +"/public"));
app.use(methodOverride("_method"));
//seedDB();


//Passport Configuration
app.use(require("express-session")({
  secret: "Node JS",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  next();
});

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

//App running on server
app.listen(3000, function(){
  console.log("Yelp Camp running on locahost:3000")
});
