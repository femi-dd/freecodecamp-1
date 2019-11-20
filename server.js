// server.js
// where your node app starts

// init project
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/timestamp/", (req, res) => {
  res.json({ unix: Date.now(), utc: Date() });
});

// https://flowery-pentaceratops.glitch.me/api/timestamp/1450137600
app.get("/api/timestamp/:date_string", function (req, res) {
  var dateString = req.params.date_string;

  dateString = new Date(dateString);

  // Checks for invalid date(by parsing both as int and date) and responds with appropriate error message if fails :(
  
  if(dateString != "Invalid Date") {
    return res.json({
      unix: Number(dateString.getTime()),
      utc: dateString.toUTCString()
    });
  }
  
  dateString = req.params.date_string;
  
  if(new Date(parseInt(req.params.date_string)) != "Invalid Date") {
    return res.json({
      unix: Number(dateString),
      utc: new Date(parseInt(req.params.date_string)).toUTCString(),
    });
  }
  
  return res.json({error: "Invalid Date"});

});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
  console.log('======================================================');
});
