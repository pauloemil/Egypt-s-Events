const express = require("express");
const app = express();
const eventRouter = require("./routes/eventRouter");
const session = require("express-session");
const flash = require("connect-flash");
// const bodyParser = require("body-parser");

//connect to db
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

// Brings events routes
app.use("/Event", eventRouter);

app.get("/", (req, res) => {
  res.send("!");
});

app.listen(3000, () => {
  console.log("http://localhost:3000/event");
});
