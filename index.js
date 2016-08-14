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
 
var currentStatus = {};

app.get("/", function(req, res) {
    res.render("index.html");
});

app.get("/status", function(req, res) {
    res.json(currentStatus);
});

app.listen(3000, function() {
    console.log("radiodiodi status display listening on port 3000.");
});


function get_status(err, data) {
    currentStatus = [];
    for (var i = 0; i < data.length; i++) {
        var is_up = data[i].Status == 'Up';

        var system = {}
        system.name = data[i].WebsiteName;
        system.status = is_up;
        system.uptime = data[i].Uptime;
        currentStatus.push(system);
    }

    console.log(currentStatus);
}

setInterval(function() {
    statuscake.tests(get_status);
}, 5000);
