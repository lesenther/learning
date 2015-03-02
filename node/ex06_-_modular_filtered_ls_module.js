var fs = require('fs');

module.exports = function(path, filetype){
  fs.readdir(path, function(err, data){
    if(err) return;
    data.forEach(function(file){
      if(
        (file.indexOf('.')>=0)
         &&
        (file.substring(file.lastIndexOf('.') + 1) == filetype)
      ){
        console.log(file);
      }
    });
  });
}