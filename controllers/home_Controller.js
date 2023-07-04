const Post = require("../models/post");
const User =  require('../models/user');

module.exports.home = async function (req, res) {
  // return res.end('<h1>express is up </h1>')

  // console.log(req.cookies);
  // res.cookie('user_id', 25);
//   Post.find({}, function (err, posts) {
//     if (err) {
//       console.log("error in fetching posts", err);
//       return;
//     }

//     return res.render("home", {
//       title: "welcome home",
//       posts: posts,
//     });
//   });
try {
  let posts = await Post.find({})
  .populate('user')
  .populate({
    path : 'comments',
    populate: {
      path: 'user'
    }
  });
  
    let users = await User.find({});
      
  
    return res.render("home", {
      title: "welcome home",
      posts: posts,
      all_users:users
    });
  
} catch (error) {
  
    console.log("error in fetching posts", error);
    return;
  }
  


  


    
   
};
