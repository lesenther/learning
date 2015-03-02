var fs = require('fs'); // asynchonous == non-blocking
fs.readdir(process.argv[2], function(err, data){
  if(err) throw err;
  data.forEach(function(file){
    if(
      (file.indexOf('.')>=0)
       &&
      (file.substring(file.lastIndexOf('.') + 1) == process.argv[3])
    ){
      console.log(file);
    }
  });
});