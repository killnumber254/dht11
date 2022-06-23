const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

const app = express();
const DB_PATH = path.resolve("db.json");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log(req.body);
  res.status(200).json({
    temperature: req.body.temperature,
    humidity: req.body.humidity,
    timestamp: new Date(),
  });
  // fs.readFile(DB_PATH, "utf-8", (err, jsonString) => {
  //   if (err) return console.log("Error!", err);
  //   console.log(jsonString);
  //   let values = JSON.parse(jsonString);
  //   console.log(values);
  //   res.status(200).json({
  //     totalValues: values.length,
  //     values,
  //   });
  // });
});

app.post("/", async (req, res) => {
  let body = req.body;
  let object = {
    temperature: body.temperature,
    humidity: body.humidity,
    timestamp: new Date(),
  };

  fs.writeFile(DB_PATH, JSON.stringify(object), (err) => {
    if (err) return console.log("Error", err);
    res.status(200).json({
      temperature: body.temperature,
      humidity: body.humidity,
      timestamp: new Date(),
    });
  });
  console.log(object);
});

app.get("/temp", (req, res) => {
  fs.readFile(DB_PATH, "utf-8", (err, jsonString) => {
    if (err) throw Error;
    const objJson = JSON.parse(jsonString);
    res.json({ objJson });
  });
});
// app.post("/", (req, res) => {
//   fs.readFile(DB_PATH, "utf-8", (err, jsonString) => {
//     if (err) return console.log("Error", err);
//     let body = req.body;
//     console.log(body);
//     let totalValueArr = jsonString;
//     // console.log(totalValueArr);
//     let object = {
//       temperature: body.temperature,
//       humidity: body.humidity,
//       timestamp: new Date(),
//     };
//     console.log(object);
//     // totalValueArr.push(object);
//     fs.writeFile(DB_PATH, JSON.stringify(totalValueArr), (err) => {
//       if (err) return console.log("Error", err);
//       console.log(totalValueArr[totalValueArr.length - 1]);
//       res.status(200).json({
//         message: "Value Saved",
//         values: totalValueArr[totalValueArr.length - 1],
//       });
//     });
//   });
// });

app.listen(PORT, () => {
  console.log("Start", PORT);
});
