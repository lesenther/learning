var fs = require('fs');

// Takes the path of the directory to start searching as param 1
// Takes the filetype to search for as param 2
module.exports = function(path, filetype, callback){
  fs.readdir(path, function(err, data){
    if(err) return callback(err);
    files = [];
    data.forEach(function(file){
      if(
        (file.indexOf('.')>=0)
         &&
        (file.substring(file.lastIndexOf('.') + 1) == filetype)
      ){
        files.push(file);
      }
    });
    callback(null, files);
  });
}