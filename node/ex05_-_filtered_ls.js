var fs = require('fs'); // asynchonous == non-blocking

var path = process.argv[2]; // directory to search
var ext = process.argv[3]; // file extension

fs.readdir(path, function(err, data){
  if(err) throw err;
  data.forEach(function(file){
    if((file.indexOf('.') >= 0
        ) && (
      file.substring(file.lastIndexOf('.') + 1) === ext
    )){
      console.log(file);
    }
  });
});