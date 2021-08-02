const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/eventsDatabase",
  { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false },

  (err) => {
    if (err) console.log(err);
    else console.log("Connected successfully!");
  }
);
