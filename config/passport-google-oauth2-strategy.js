const passport = require('passport');
const googleStrategy =  require('passport-google-oauth').OAuth2Strategy;

const crypto = require('crypto');

const User = require('../models/user');

passport.use(new googleStrategy({
    clientID : "907560822853-qa5og8im23onnkvlrsarhbv8daoaf8hb.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL : 'http://localhost:8000/users/auth/google/callback'
}, function(accessToken, refreshToken, profile, done){
    User.findOne({email: profile.emails[0].value}).exec(function(err,user){
        if(err){
            console.log('error in google strategy passport', err);
            return;
        }
        // console.log(accessToken,refreshToken);
        // console.log(profile);

        if(user){
            return done(null,user);

        }else{
            User.create({
                name:profile.displayName,
                email : profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            },function(err,user){
                if(err){
                    console.log('error in creating user google strategy passport', err);
                    return;
                }
                return done(null,user);

            })
        }
    })
}))

module.exports = passport;