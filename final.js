#! /usr/bin/env node
/*
*
* This code is owned by W.Hodges under the 
* Creative Commons License CC BY-NC-ND
* (Attribution-NonCommercial-NoDerivs)
* This means that you can use and share this code, 
* but are not allowed to edit, change, or sell this code.
* https://creativecommons.org/licenses/by-nc-nd/4.0/
*
*/
var parser = require("markup.js");
var fs = require('fs');
prepareIt = []
toParse = function(toParseit, name) {
	theHTML = parser.parse(toParseit);
	theHTML = theHTML.replace("\"", "");
	fs.writeFile(name+'.html', theHTML, function (err) {
        if (err) throw err;
        console.log("File saved as "+name+".html in original location.");
    });
}
var HTML;
var readIt = function(array) {
	file = array[0];
	name = array[1];
	path = ""
	for (var i = 0; i < array[3] - 1; i++) {
		if (i === 0) {
			path = path + array[2][i];
		}
		else {
			path = path + "/" + array[2][i];
		}	
	}
	name = path + "/" + name;
	fs.readFile(file, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  toParse(data, name);
});
}
process.argv.forEach(function (val, index, array) {
   if (index === 2) {
       prepareIt[0] = val;
       prepareIt[1] = array[index+1];
       var splitted = prepareIt[0].split("/")
       var len = splitted.length;
       prepareIt[prepareIt.length] = splitted;
       prepareIt[prepareIt.length] = len;
       readIt(prepareIt);
    }
});
