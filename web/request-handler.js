var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers.js');
var headers = helpers.headers;
var http = require("http");
var httpr = require("http-request");
var url = require('url')


// require more modules/folders here!

exports.handleRequest = function (request, response) {
  if (request.method === 'GET') {
    var file;
    var pathName = request.url;
    pathName = url.parse(pathName).pathname;

    if (request.url === '/') {
      file = archive.paths.siteAssets;
    } else {
      file = archive.paths.archivedSites;
    }

    file = path.join(file, pathName);

    fs.readFile(file, function(err, data) {
      if (err) {
        response.writeHead(404, headers)
        response.end("Not found");
      }
      response.writeHead(200, headers);
      response.end(data);
    });
  }

  if (request.method === 'POST') {
    var data = "";
    request.on('data', function(chunk) {
      data += chunk;
    });
    request.on('end', function() {
      var addToFile = data.slice(4);
      fs.appendFile(archive.paths.list, addToFile, function(err) {
        if (err) {
          throw err;
        }
        // console.log(addToFile);
      })
    })
    // console.log(request.url)
    // archive.addUrlToList
  }

  // response.end(archive.paths.lists);
};

// exports.handleRequest = function(request, response) {
//   if (request.method === 'GET') {
//     console.log(request)

    // httpr.get('./public/index.html', function(err, data) {
    //   console.log("DATA ", data)
    // })
  // }
  // var action = methods[request.method]
  // if (action) {
  //   action(request, response)
  // } else {
  //   sendResponse(response, "Not Found", 404);
  // }
// }

// var methods = {
//   GET: httpr.get('./public/index.html', function(err, data) {

//   }),
  // GET: function(request, response) {
  //   sendResponse(response, fs.readFile('./public/index.html', function (err, data) {
  // if(err) {
  //   throw err;
  // }
  // console.log(data);
  // return data;
// }))  //'<input'
//   },

//   POST: function() {
//     sendResponse(response, something, 201);
//   }
// }


var sendResponse = function(response, data, statusCode) {
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end(data);
}