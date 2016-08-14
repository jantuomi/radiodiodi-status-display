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

var UPDATE_INTERVAL = 60000;
var PORT = 3000;

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

app.listen(PORT, function() {
    console.log("radiodiodi status display listening on port " + PORT + ".");
});

function get_status(err, data) {
    currentStatus = [];
    for (var i = 0; i < data.length; i++) {

        var system = {}
        system.name = data[i].WebsiteName;
        system.status = data[i].Status == 'Up';
        system.uptime = data[i].Uptime;
        currentStatus.push(system);
    }

    console.log(currentStatus);
}

statuscake.tests(get_status);
setInterval(function() {
    statuscake.tests(get_status);
}, UPDATE_INTERVAL);
