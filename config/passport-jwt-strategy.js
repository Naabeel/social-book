const passport = require('passport');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt; 


const User = require('../models/user');


let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'socialbook'
}

passport.use(new JWTstrategy(opts, function(jwtPayLoad, done){
    try {
      let user =  User.findById(jwtPayLoad._id);
      if(user) {
        return done(null,user);
      }else{
        return done(null,false);
      }

        
    } catch (error) {
        if(error){
            console.log('error in finding the user from Jwt',error);
            return
        }
        
    }
}))

module.exports = passport