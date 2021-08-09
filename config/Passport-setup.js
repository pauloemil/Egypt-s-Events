const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../models/users");

//save user

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  "local.register",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      if (req.body.password != req.body.confirmPassword)
        return done(
          null,
          false,
          req.flash("error", "Passwords does not match")
        );
      User.findOne({ email: username }, (err, user) => {
        if (err) return done(err);
        if (user)
          return done(null, false, req.flash("error", "Email is used before"));
        let newUser = new User({
          email: req.body.email,
          username: req.body.username,
        });
        newUser.password = newUser.hashPassword(req.body.password);
        newUser.save((err, user) => {
          if (err) console.log(err);
          else
            return done(
              null,
              user,
              req.flash("success", "Email is now registered")
            );
        });
      });
    }
  )
);

passport.use(
  "local.login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      User.findOne({ email: username }, (err, user) => {
        if (err)
          return done(null, false, req.flash("error", "Somthing wrong!"));
        if (!user || !user.comparePasswords(password, user.password))
          return done(null, false, req.flash("error", "Wrong credentials!"));
        return done(null, user, req.flash("success", "Welcome back!"));
      });
    }
  )
);
