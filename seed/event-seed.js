const db = require("../config/database");
const Event = require("../models/event");

// let newEvent = new Event({
//   title: "Amr diab concert",
//   description: "first event of amr diab in tur sinai",
//   location: "Egypt, Sinai, Tur sinai",
//   date: Date.now(),
// });

let newEvents = [
  new Event({
    title: "Amr diab concert1",
    description:
      "first event of amr diab in tur sinai. It is a long established fact that a reader will be distracted by the readable content of a page.",
    location: "Egypt, Sinai, Tur sinai",
    date: Date.now(),
    created_at: Date.now(),
  }),
  new Event({
    title: "Amr diab concert2",
    description:
      "first event of amr diab in tur sinai. It is a long established fact that a reader will be distracted by the readable content of a page.",
    location: "Egypt, Sinai, Tur sinai",
    date: Date.now(),
    created_at: Date.now(),
  }),
  new Event({
    title: "Amr diab concert3",
    description:
      "first event of amr diab in tur sinai. It is a long established fact that a reader will be distracted by the readable content of a page.",
    location: "Egypt, Sinai, Tur sinai",
    date: Date.now(),
    created_at: Date.now(),
  }),
  new Event({
    title: "Amr diab concert4",
    description:
      "first event of amr diab in tur sinai. It is a long established fact that a reader will be distracted by the readable content of a page.",
    location: "Egypt, Sinai, Tur sinai",
    date: Date.now(),
    created_at: Date.now(),
  }),
  new Event({
    title: "Amr diab concert5",
    description:
      "first event of amr diab in tur sinai. It is a long established fact that a reader will be distracted by the readable content of a page.",
    location: "Egypt, Sinai, Tur sinai",
    date: Date.now(),
    created_at: Date.now(),
  }),
  new Event({
    title: "Amr diab concert6",
    description:
      "first event of amr diab in tur sinai. It is a long established fact that a reader will be distracted by the readable content of a page.",
    location: "Egypt, Sinai, Tur sinai",
    date: Date.now(),
    created_at: Date.now(),
  }),
  new Event({
    title: "Amr diab concert7",
    description:
      "first event of amr diab in tur sinai. It is a long established fact that a reader will be distracted by the readable content of a page.",
    location: "Egypt, Sinai, Tur sinai",
    date: Date.now(),
    created_at: Date.now(),
  }),
  new Event({
    title: "Amr diab concert8",
    description:
      "first event of amr diab in tur sinai. It is a long established fact that a reader will be distracted by the readable content of a page.",
    location: "Egypt, Sinai, Tur sinai",
    date: Date.now(),
    created_at: Date.now(),
  }),
];

newEvents.forEach((event) => {
  event.save((err) => {
    if (err) console.log(err);
    else console.log("Done!");
  });
});

// newEvent.save((err) => {
//   if (err) console.log(err);
//   else console.log("Done!");
// });
