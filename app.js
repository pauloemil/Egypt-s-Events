const express = require("express");
const app = express();
const eventRouter = require("./routes/eventRouter");
const userRouter = require("./routes/userRoutes");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const passportSetup = require("./config/Passport-setup");
const User = require("./models/users");

//connect to db
//testing limits
//asdasd
const db = require("./config/database");
// const schemaEvents = require("");
// Brings EJS engine
app.set("view engine", "ejs");

//bring bodyparser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Brings Static
app.use(express.static("newPublic"));
// app.use(express.static("public"));
app.use(express.static("node_modules"));

// set session nd flash
app.use(
  session({
    secret: "paulo",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 * 15 },
  })
);
app.use(flash());

// bring passport

app.use(passport.initialize());
app.use(passport.session());

//store user object

app.get("*", (req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// Brings events routes
app.use("/Event", eventRouter);
app.use("/User", userRouter);
app.get("/", (req, res) => {
  res.send("this is the root hehe ♥");
});

app.listen(3000, () => {
  console.log("http://localhost:3000/event");
});
