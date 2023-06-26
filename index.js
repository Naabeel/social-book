const express = require('express');
const app = express();
const port = 8000;
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose')
const session = require('express-session');
const passport = require('passport');
const passportLocal =  require('./config/passport-local-startegy');
const mongoStore =  require('connect-mongo');


app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));


app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.set('view engine', 'ejs');
app.set('views', './views');


app.use(session({
    name:'socialbook',
    secret: 'nabeel',
    saveUninitialized : false,
    resave : false,
    cookie:{
        maxAge : (10000 *60*100)
    },
    store: new mongoStore({
        mongoUrl : 'mongodb://127.0.0.1/social-book',
        autoRemove: 'disabled',
    }, function(err){
        console.log(err || 'connect-mongodb setup ok');
    })
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);




//use expresss router
app.use('/', require('./routes'));

app.listen(port , function(err){
    if(err){
        console.log(`error in running the server: ${err}` );
    }
    console.log(`server is running on port : ${port} `);
});