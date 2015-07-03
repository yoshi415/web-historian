// SOLUTION COPY & PASTE
var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var url = require('url');
var helpers = require('./http-helpers');
var querystring = require('querystring');

var getSite = function(request, response){
  var urlPath = url.parse(request.url).pathname;

  // / means index.html
  if (urlPath === '/') { urlPath = '/index.html'; }

  helpers.serveAssets(response, urlPath, function() {
    // trim leading slash if present
    if (urlPath[0] === '/') { urlPath = urlPath.slice(1)}

    archive.isUrlInList(urlPath, function(found){
      if (found) {
        helpers.sendRedirect(response, '/loading.html');
      } else {
        helpers.send404(response);
      }
    });
  });
};

var saveSite = function(request, response){
  helpers.collectData(request, function(data) {
    var url = querystring.parse(data).url;
    // check sites.txt for web site
    archive.isUrlInList(url, function(found){
      if (found) { // found site
        // check if site is on disk
        archive.isUrlArchived(url, function(exists) {
          if (exists) {
            // redirect to site page (/www.google.com)
            helpers.sendRedirect(response, '/' + url);
          } else {
            // Redirect to loading.html
            helpers.sendRedirect(response, '/loading.html');
          }
        });
      } else { // not found
        // add to sites.txt
        archive.addUrlToList(url, function(){
          // Redirect to loading.html
          helpers.sendRedirect(response, '/loading.html');
        });
      }
    });
  });
};

var actions = {
  'GET': getSite,
  'POST': saveSite
};

// use this pattern to differentiate between archives, static assets, and errors
exports.handleRequest = function (req, res) {
  var handler = actions[req.method];

  if (handler) {
    handler(req, res);
  } else {
    helpers.send404(response);
  }
};

// OUR CODE BELOW

// var path = require('path');
// var fs = require('fs');
// var archive = require('../helpers/archive-helpers');
// var helpers = require('./http-helpers.js');
// var headers = helpers.headers;
// var http = require("http");
// var httpr = require("http-request");
// var url = require('url')

// exports.handleRequest = function (request, response) {
//   if (request.method === 'GET') {
//     var file;
//     // parse pathname from URL, (after host, before query)
//     var pathName = request.url;
//     pathName = url.parse(pathName).pathname;
//     // routing for requested url
//     if (request.url === '/') {
//       file = archive.paths.siteAssets;
//     } else {
//       file = archive.paths.archivedSites;
//     }
//     // join routing with url
//     file = path.join(file, pathName);
//     // readFile checking if file exists and sends back
//     fs.readFile(file, function(err, data) {
//       if (err) {
//         response.writeHead(404, headers)
//         response.end("Not found");
//       }
//       response.writeHead(200, headers);
//       response.end(data);
//     });
//   }

//   if (request.method === 'POST') {
//     var data = "";
//     request.on('data', function(chunk) {
//       data += chunk;
//     });
//     request.on('end', function() {
//       var addToFile = data.slice(4) + '\n';
//       fs.appendFile(archive.paths.list, addToFile, function(err) {
//         if (err) {
//           throw err;
//         }
//         response.writeHead(302, headers);
//         response.end();
//       });
//     });
//   }
// };

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


// var sendResponse = function(response, data, statusCode) {
//   statusCode = statusCode || 200;
//   response.writeHead(statusCode, headers);
//   response.end(data);
// }