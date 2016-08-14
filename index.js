var statuscake = require("statuscake");
 
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
 
function allTests(err, data) {
    console.log(data);
}

statuscake.tests(allTests);
