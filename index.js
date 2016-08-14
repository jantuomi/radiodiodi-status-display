var statuscake = require("statuscake");
var express = require("express");
var ejs = require("ejs");

var app = express();
app.set("views", __dirname + "/views");
app.engine("html", ejs.renderFile);
app.use(express.static("public"));

var args = process.argv.slice(2);
if (args.length != 2) {
    console.log("Please provide user and key as positional arguments.");
    process.exit(1);
}

var username = args[0];
var password = args[1];

statuscake
  .username(username)
  .key(password);
 
app.get("/", function(req, res) {
    res.render("index.html");
});

app.listen(3000, function() {
    console.log("radiodiodi status display listening on port 3000.");
});

function allTests(err, data) {
    console.log(data);
}

statuscake.tests(allTests);
