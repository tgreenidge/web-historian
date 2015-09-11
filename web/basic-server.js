var http = require("http");
var handler = require("./request-handler");
var initialize = require("./initialize.js");
var requestMod = require('request');

// Why do you think we have this here?
// HINT: It has to do with what's in .gitignore
initialize();

var port = 8080;
var ip = "127.0.0.1";
var server = http.createServer(handler.handleRequest);

if (module.parent) {
  module.exports = server;
} else {
  server.listen(port, ip);
  console.log("Listening on http://" + ip + ":" + port);
}

var fs = require('fs');


//test
/*
var util = require('util');
var options = {
    host: "www.google.com",
    port: 80,
    path: "/"
};

var content = "";

var req = http.request(options, function(res) {
    res.setEncoding("utf8");
    res.on("data", function (chunk) {
        content += chunk;
    });

    res.on("end", function () {
      util.log(content);

    });
});

req.end();*/
/*
requestMod('http://www.google.com', function (error, response, body) {
  console.log('request mod has run');
    if (!error && response.statusCode === 200) {
      console.log('the requestMod is being run!!!');
        console.log(body); // Show the HTML for the Modulus homepage.
    }
});
*/
/*
var archive = require('../helpers/archive-helpers');
archive.downloadUrls(['www.google.com']);
*/