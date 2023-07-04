const User = require("../models/user");

module.exports.profile = async function (req, res) {
  try {
    let user = await User.findById(req.params.id);
    return res.render("user_profile", {
      title: "user_profile",
      profile_user: user,
    });
  } catch (error) {
    console.log("Error", error);
    return;
  }
};

module.exports.update =async function (req, res) {
 try {
    if (req.user.id == req.params.id) {
        let user = await User.findByIdAndUpdate(req.params.id, req.body);
           return res.redirect("back");
         
       } else {
         return res.status(401).send("Unauthorised");
       }
 } catch (error) {
    console.log("Error", error);
    return;
 }
};

module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

  return res.render("user_sign_up", {
    title: "sign-up",
  });
};

module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_in", {
    title: "sign-up",
  });
};

module.exports.create = async function (req, res) {
  try {
    if (req.body.password != req.body.confirm_password) {
      return res.redirect("back");
    }

    let user = await User.findOne({ email: req.body.email });
    if (err) {
      console.log("error in finding user to sign up");
      return;
    }

    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("error in creating user to sign up");
          return;
        }

        return res.redirect("/users/sign-in");
      });
    } else {
      return res.redirect("back");
    }
  } catch (error) {
    console.log("Error", error);
    return;
  }
};

module.exports.createSession = function (req, res) {
    req.flash('success', 'Logged in Successfully');
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  req.logout(function (err) {
    if (err) {
      console.log("error in loggin out", err);
    }
    req.flash('success', 'Logged out Successfully')
  });
  return res.redirect("/");
};
