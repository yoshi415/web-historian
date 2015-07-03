var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');
var archive = require("../helpers/archive-helpers");

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
// exports.initialize = function(pathsObj){
//   _.each(pathsObj, function(path, type) {
//     exports.paths[type] = path;
//   });
// };

// // The following function names are provided to you to suggest how you might
// // modularize your code. Keep it clean!

// exports.readListOfUrls = function(cb){
//   fs.readFile(exports.paths.list, 'utf8', function(err, data) {
//     if (err) {
//       throw err;
//     }
//     cb(data.split("\n"));
//   })
// };

// // SOLUTION CODE
// // exports.readListOfUrls = function(cb){
// //   fs.readFile(exports.paths.list, 'utf8', function(err, sites) {
// //     sites = sites.toString().split('\n');
// //     if (cb) {
// //       cb(sites);
// //     }
// //   })
// // };


// exports.isUrlInList = function(url, cb){
//   fs.readFile(exports.paths.list, 'utf8', function(err, data) {
//     if (err) {
//       throw err;
//     }
//     var URLs = data.split("\n");
//     cb(URLs.indexOf(url));
//   })
// };

// exports.addUrlToList = function(url, cb){
//   var append = url + "\n";
//   cb(fs.appendFile(archive.paths.list, append, function(err) {
//     if (err) {
//       throw err;
//     }
//   }));
// };

// exports.isUrlArchived = function(url, cb){
//   var writeTo = path.join(exports.paths.archivedSites, url)
//   cb(fs.appendFile(writeTo, 'blah blah', function(err) {
//     if (err) {
//       throw err;
//     }
//   }))
// };

// exports.downloadUrls = function(urlArray){
//   _.each(urlArray, function(url) {
//     if (!url) {
//       return;
//     }
//     request('http://' + url).pipe(fs.createWriteStream(exports.paths.archivedSites + "/" + url));
//   });
// };
  // console.log("dir: ", fs.readdirSync(exports.paths.archivedSites));
  // fs.readdir(exports.paths.archivedSites, function(err, files) {
  //   console.log("files: ", files);
  //   for (var i = 0; i < urlArray.length; i++) {
  //     if (files.indexOf(urlArray[i]) === -1) {

        // var append = path.join(exports.paths.archivedSites, urlArray[i]);
        // fs.appendFile(append, 'blah blah', function(err) {
        //   if (err) {
        //     throw err;
        //   }
        // })
        // write url to /archives/sites.txt
        // fs.appendFile('./archives/sites.txt', urlArray[i] + "\n", function(err) {
        //   if (err) {
        //     throw err;
        //   }
        // })
  //     }
  //   }
  // })
// };

// SOLUTION COPY & PASTE
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};


exports.readListOfUrls = function(callback){
  fs.readFile(exports.paths.list, function(err, sites) {
    sites = sites.toString().split('\n');
    if( callback ){
      callback(sites);
    }
  });
};

exports.isUrlInList = function(url, callback){
  exports.readListOfUrls(function(sites) {
    var found = _.any(sites, function(site, i) {
      return site.match(url)
    });
    callback(found);
  });
};

exports.addUrlToList = function(url, callback){
  fs.appendFile(exports.paths.list, url + '\n', function(err, file){
    callback();
  });
};

exports.isUrlArchived = function(url, callback){
  var sitePath = path.join(exports.paths.archivedSites, url);

  fs.exists(sitePath, function(exists) {
    callback(exists);
  });
};

exports.downloadUrls = function(urls){
  // Iterate over urls and pipe to new files
  _.each(urls, function (url) {
    if (!url) { return; }
    request('http://' + url).pipe(fs.createWriteStream(exports.paths.archivedSites + "/" + url));
  });
};

