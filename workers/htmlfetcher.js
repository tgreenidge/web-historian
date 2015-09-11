// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

var helpers = require('../helpers/archive-helpers');
var fs = require('fs');

//check urls in sites.txt
//download html for each url

//create files inside sites folder for each url
// write html dl from internet to each file
//delete contents of sites.txt

archive.readListOfUrls(function(urls) {
  archive.downloadUrls(urls);
})


