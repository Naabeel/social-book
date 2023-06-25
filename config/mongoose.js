const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/social-book');

const db = mongoose.connection;

db.on('error', console.error.bind(console,"error in connecting to db"));

db.once('open', function(){
    console.log( 'connected to db' );
});

module.exports=db;