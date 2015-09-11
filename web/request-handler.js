var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
var fs = require('fs');
var url = require('url');

// require more modules/folders here!

exports.handleRequest = function (req, res) {

  var options = {
    GET: function(){
      console.log('called GET'); // delete
      var urlPath = url.parse(req.url).pathname;
      var pathname = urlPath === '/' ? '/index.html' : urlPath;
      console.log(pathname); // delete
      helpers.serveAssets(res, pathname, function(){
        console.log('serveAssets callback invoked');  // delete
        archive.isUrlInList(urlPath, function(found){
          if(found){
            console.log('found in list'); // delete
            helpers.sendRedirect(res, '/loading.html');
          }else{
            console.log('not found in list'); // delete
            helpers.send404(res);
          }
        });
      });
    },

    POST: function(){
      console.log('called POST'); // delete
      var fullBody = '';
      req.on('data', function(chunk) {
        fullBody += chunk;
      });
      req.on('end', function() {
        if (fullBody.trim()[0] === '{') { // necessary to pass tests
          var url = JSON.parse(fullBody).url;
        } else {
          var url = fullBody.split('=')[1];
        }
        console.log(url); // delete
        archive.isUrlInList(url, function(found){
          if(found){
            console.log('found in list'); // delete
            archive.isUrlArchived(url, function(foundInArchive){
              console.log('foundInArchive: ' + foundInArchive); // delete
              if(foundInArchive){
                helpers.sendRedirect(res, '/'+ url);
              }else{
                helpers.sendRedirect(res, '/loading.html');
              }
            })
          }else{
            archive.addUrlToList(url, function(){
              console.log('ran addUrlToList'); // delete
              console.log(archive.paths.list); // delete
              fs.readFile(archive.paths.list, 'utf8', function(err, data) {console.log('data is: ' + data);});
              helpers.sendRedirect(res, '/loading.html');
            });
          }
        });
      });
    }
  };

  if(options[req.method]){
    options[req.method]();
  }else{
    helpers.send404(res);
  }

  // if (req.method === 'POST') {
  //   console.log('POST!!!!');
  //   var fullBody = '';
  //   req.on('data', function(chunk) {
  //     fullBody += chunk;
  //     console.log(typeof fullBody);
  //     console.log('data coming through is: ' + fullBody);
  //     var urlObj = JSON.parse(fullBody);
  //     fs.appendFileSync(archive.paths.list, urlObj.url + '\n' );
  //   });
  //   res.writeHead(302, helpers.headers);
  //   res.end();
  // }

  // if(req.method === 'GET'){
  //   var pathname = req.url === '/' ? './web/public/index.html' : archive.paths.archivedSites + '/' + req.url;
  //   helpers.serveAssets(res, pathname);
  // }
};