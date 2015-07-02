var http = require("http");
var fs = require('fs');
var httpr = require("http-request");
var handler = require("./request-handler");
var initialize = require("./initialize.js");
var archive = require('../helpers/archive-helpers');


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

// fs.readFile('./public/index.html', function (err, html) {
//   if(err) {
//     throw err;
//   }
//   console.log(html);
//   http.createServer(function(request, response) {
//     response.writeHead(200, {"Content-Type" : "text/html"});
//     response.write(html);
//     response.end;
//   }).listen(8080, ip);
// });


// http.createServer(function(request, response) {
//   fs.readFile('./public/index.html', function (err, html) {
