const express = require('express');
const app = express();
const port = 8000;
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose')
const session = require('express-session');
const passport = require('passport');
const passportLocal =  require('./config/passport-local-startegy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const mongoStore =  require('connect-mongo')(session);
const flash = require('connect-flash');
const customMware = require('./config/middleware');

const chatServer = require('http').Server(app);
const chatSocket = require('./config/chat_sockets').chatSockets(chatServer);
 chatServer.listen(5000);
 console.log('chat server is listening on port 5000');


app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));
app.use('/uploads', express.static(__dirname + '/uploads' ));


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
        mongooseConnection : db,
        autoRemove: 'disabled',
    }, function(err){
        console.log(err || 'connect-mongodb setup ok');
    })
}));
// app.use(
//     session({
//       name: "Codeial",
//       // TODO - Change the secret before deployment in production mode
//       secret: "something",
//       saveUninitialized: false,
//       resave: false,
//       cookie: {
//         maxAge: 1000 * 60 * 100,
//       },
//       storetore: new mongoStore(
//         {
//           mongooseConnection: db,
//           autoRemove: "disabled",
//         },
//         (error) => {
//           console.log(error || "connect-mongodb setup ok");
//         }
//       ),
//     })
//   );


app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);




//use expresss router
app.use('/', require('./routes'));

app.listen(port , function(err){
    if(err){
        console.log(`error in running the server: ${err}` );
    }
    console.log(`server is running on port : ${port} `);
});