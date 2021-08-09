const express = require("express");
const router = express.Router();
const User = require("../models/users");
const bcrypt = require("bcrypt");
const passport = require("passport");

//middlewhere auth

isAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  req.flash("error", "Login first, Please!");
  res.redirect("/user/login");
};

router.get("/login", (req, res) => {
  if (req.isAuthenticated()) res.redirect("/event");
  else
    res.render("user/Login.ejs", {
      error: req.flash("error"),
      success: req.flash("success"),
    });
});

router.post(
  "/login",
  passport.authenticate("local.login", {
    successRedirect: "/user/profile",
    failureRedirect: "/user/login",
    failureFlash: true,
  })
);

router.get("/register", (req, res) => {
  if (req.isAuthenticated()) res.redirect("/event");
  else res.render("user/register", { error: req.flash("error") });
});

router.post(
  "/register",
  passport.authenticate("local.register", {
    successRedirect: "/user/profile",
    failureRedirect: "/user/register",
    failureFlash: true,
  })
);

router.get("/profile", isAuth, (req, res) => {
  res.render("user/profile", { success: req.flash("success") });
});
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/event");
});

module.exports = router;
