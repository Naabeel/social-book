const User = require("../models/user");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback:true,
    },
    function (req,email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          // console.log("eror in finding user --> passport");
          req.flash('error', err)
          return done(err);
        }
        if(!user || user.password != password){
            // console.log("eror in finding user --> passport");
            req.flash('error', 'Invalid username/password')
            return(null,false);

        }
        return done(null,user);
      });
    }
  )
);


passport.serializeUser(function(user,done){
    done(null,user.id);
})

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('error in finding user --> passport');
            return done(err);
        }
        return done(null,user)
    })
})


passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/sign-in');
}


passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}


module.exports = passport;