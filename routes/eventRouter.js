const express = require("express");
const router = express.Router();
const Event = require("../models/event");
const { check, validationResult } = require("express-validator");
const moment = require("moment");
const multer = require("multer");
var fs = require("fs");
var path = require("path");

//storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

//upload parameters for multer
const upload = multer({
  storage: storage,
  limits: { filesize: 1024 * 1024 * 5 },
});
router.get("/", (req, res) => {
  Event.find({}, (err, events) => {
    if (err) console.log(err);
    else {
      res.render("event/index.ejs", {
        events: events,
        success_msg: req.flash("success_msg"),
      });
    }
  });
});

router.get("/create", (req, res) => {
  res.render("event/create.ejs", { errors: req.flash("errors") });
});

router.post(
  "/create",
  upload.single("imageFile"),
  [
    check("title")
      .isLength({ min: 5 })
      .withMessage("Title Should be more than 5 chars"),

    check("shortDescription")
      .isLength({ min: 10, max: 150 })
      .withMessage("Short description Should be between 10-150 chars"),
    check("description")
      .isLength({ min: 30 })
      .withMessage("Description Should be more than 30 chars"),
    check("location")
      .isLength({ min: 3 })
      .withMessage("Location Should be more than 3 chars"),
    check("date").isLength({ min: 10 }).withMessage("Date Should be valid"),
  ],
  (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      req.flash("errors", err.array());
      res.redirect("/event/create");
    } else {
      let event = new Event({
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        description: req.body.description,
        location: req.body.location,
        date: req.body.date,
        img: {
          data: fs.readFileSync(path.join("./uploads/" + req.file.filename)),
          contentType: "image/png",
        },
        created_at: Date.now(),
      });
      event.save((err) => {
        if (err) console.log(err);
        else {
          req.flash(
            "success_msg",
            req.body.title + " event is successfully added!"
          );
          res.redirect("/event");
        }
      });
    }
  }
);

router.get("/edit/:id", (req, res) => {
  Event.findOne({ _id: req.params.id }, (err, event) => {
    if (err) console.log(err);
    else
      res.render("event/edit.ejs", {
        event: event,
        eventDate: moment(event.date).format("YYYY-MM-DD"),
        errors: req.flash("errors"),
        success_msg: req.flash("success_msg"),
      });
  });
});

router.post("/delete/:id", (req, res) => {
  Event.findOneAndDelete({ _id: req.params.id }, (err) => {
    if (err) console.log(err);
    else {
      req.flash("success_msg", "Event is deleted successfully!");
      res.redirect("/event");
    }
  });
});
router.post(
  "/edit/:id",

  [
    check("title")
      .isLength({ min: 5 })
      .withMessage("Title Should be more than 5 chars"),
    check("shortDescription")
      .isLength({ min: 10, max: 150 })
      .withMessage("Short description Should be between 10-150 chars"),
    check("description")
      .isLength({ min: 30 })
      .withMessage("Description Should be more than 30 chars"),
    check("location")
      .isLength({ min: 3 })
      .withMessage("Location Should be more than 3 chars"),
    check("date").isLength({ min: 10 }).withMessage("Date Should be valid"),
  ],
  (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      req.flash("errors", err.array());
      res.redirect("/event/edit/" + req.params.id);
    } else {
      Event.findOneAndUpdate(
        { _id: req.params.id },
        {
          title: req.body.title,
          shortDescription: req.body.shortDescription,
          description: req.body.description,
          location: req.body.location,
          date: req.body.date,
          created_at: Date.now(),
        },
        (err) => {
          if (err) console.log(err);
          else {
            req.flash(
              "success_msg",
              "Done editing " + req.body.title + " successfully!"
            );
            res.redirect("/event");
          }
        }
      );
    }
  }
);
router.get("/:id", (req, res) => {
  Event.findOne({ _id: req.params.id }, (err, event) => {
    if (err) console.log(err);
    else {
      res.render("event/show.ejs", { event: event });
    }
  });
});

module.exports = router;
