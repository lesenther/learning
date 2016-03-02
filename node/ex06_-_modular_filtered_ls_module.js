var fs = require('fs');

module.exports = function(path, ext, callback){
  fs.readdir(path, function(err, data){
    if(err) return callback(err);

    files = [];

    data.forEach(function(file){
      if((file.indexOf('.') >= 0
          ) && (
        file.substring(file.lastIndexOf('.') + 1) === ext
      )){
        files.push(file);
      }
    });

    callback(null, files);
  });
}